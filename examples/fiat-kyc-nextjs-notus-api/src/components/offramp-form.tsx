"use client";

import { Form } from "@notus-api-examples/ui/components/form";
import { Button } from "@notus-api-examples/ui/components/button";
import {
	useForm,
	zodResolver,
} from "@notus-api-examples/ui/components/hook-form";
import {
	fiatWithdrawQuoteSchema,
	fiatWithdrawSchema,
	executeUserOpSchema,
} from "@/actions/schemas";
import { useCallback, useState } from "react";
import { fiatWithdrawQuoteAction } from "@/actions/fiatWithdrawQuote";
import { fiatWithdrawAction } from "@/actions/fiatWithdraw";
import { executeUserOpAction } from "@/actions/executeUserOp";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import {
	Alert,
	AlertDescription,
} from "@notus-api-examples/ui/components/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@notus-api-examples/ui/components/card";
import type { z } from "zod/v4";
import { toast } from "sonner";
import type { FiatWithdrawQuoteResponse } from "@/http/fiatWithdrawQuote";
import type { FiatWithdrawResponse } from "@/http/fiatWithdraw";
import type { ExecuteUserOpResponse } from "@/http/executeUserOp";
import { WithdrawQuoteFormFields } from "./withdraw-quote-form-fields";
import { CompleteWithdraw } from "./complete-withdraw";
import { WithdrawCompleted } from "./withdraw-completed";
import { useAccount, useSignMessage } from "wagmi";

const quoteFormSchema = fiatWithdrawQuoteSchema;
const withdrawFormSchema = fiatWithdrawSchema.omit({
	quoteId: true,
	walletAddress: true,
});

type QuoteFormSchema = z.infer<typeof quoteFormSchema>;
type WithdrawFormSchema = z.infer<typeof withdrawFormSchema>;

export function OffRampForm() {
	const [step, setStep] = useState<"quote" | "withdraw" | "completed">("quote");
	const [quote, setQuote] = useState<FiatWithdrawQuoteResponse | null>(null);
	const [result, setResult] = useState<ExecuteUserOpResponse | null>(null);
	const { address } = useAccount();
	const { signMessageAsync, isPending: isSigning } = useSignMessage();

	const quoteForm = useForm({
		resolver: zodResolver(quoteFormSchema),
		defaultValues: {
			chainId: 137,
			fiatCurrencyOut: "BRL" as const,
			amountInCryptoCurrency: "10",
			cryptoCurrencyIn: "BRZ" as const,
		},
	});

	const withdrawForm = useForm({
		resolver: zodResolver(withdrawFormSchema),
		defaultValues: {
			chainId: 137,
			taxId: "",
			pixKey: "",
		},
	});

	const onQuoteSubmit = useCallback(
		async (data: QuoteFormSchema) => {
			const toastId = toast.loading("Getting Quote", {
				description: "Fetching your withdrawal quote...",
			});

			const result = await fiatWithdrawQuoteAction(data);

			if (!result.success) {
				quoteForm.setError("root", {
					message: result.error,
				});
				toast.error("Quote Request Failed", {
					id: toastId,
					description: "Failed to get withdrawal quote",
				});
				return;
			}

			setQuote(result.data);
			setStep("withdraw");
			toast.success("Quote Retrieved", {
				id: toastId,
				description: "Your withdrawal quote is ready!",
			});
		},
		[quoteForm],
	);

	const onWithdrawSubmit = useCallback(
		async (data: WithdrawFormSchema) => {
			if (!quote || !address) return;

			const toastId = toast.loading("Creating Withdrawal Order", {
				description: "Processing your withdrawal order...",
			});

			const result = await fiatWithdrawAction({
				...data,
				quoteId: quote.withdrawQuote.quoteId,
				walletAddress: address,
			});

			if (!result.success) {
				withdrawForm.setError("root", {
					message: result.error,
				});
				toast.error("Withdrawal Failed", {
					id: toastId,
					description: "Failed to create your withdrawal order",
				});
				return;
			}

			// If signature is provided, execute the withdrawal immediately
			toast.loading("Executing Withdrawal", {
				id: toastId,
				description: "Submitting your signed transaction...",
			});

			const signature = await signMessageAsync({
				message: {
					raw: result.data.withdrawOrder.userOpHash,
				},
			});

			const executeResult = await executeUserOpAction({
				quoteId: result.data.withdrawOrder.userOpHash,
				signature,
			});

			if (!executeResult.success) {
				toast.error("Execution Failed", {
					id: toastId,
					description: "Failed to execute your withdrawal",
				});
				return;
			}

			setResult(executeResult.data);
			setStep("completed");
			toast.success("Withdrawal Executed", {
				id: toastId,
				description: "Your withdrawal has been successfully executed!",
			});
		},
		[withdrawForm, quote, address, signMessageAsync],
	);

	const resetForm = () => {
		setStep("quote");
		setQuote(null);
		setResult(null);
		quoteForm.reset();
		withdrawForm.reset();
	};

	// Completed step
	if (step === "completed" && result) {
		return <WithdrawCompleted result={result} onStartNewWithdraw={resetForm} />;
	}

	// Withdraw step
	if (step === "withdraw" && quote) {
		return (
			<CompleteWithdraw
				quote={quote}
				form={withdrawForm}
				onSubmit={onWithdrawSubmit}
				onBack={() => {
					setStep("quote");
				}}
			/>
		);
	}

	// Quote step (default)
	return (
		<Card className="w-full max-w-lg">
			<CardHeader>
				<CardTitle>Fiat Off-Ramp</CardTitle>
				<CardDescription>
					Get a quote for your crypto to fiat withdrawal.
				</CardDescription>
				{quoteForm.formState.errors.root && (
					<Alert className="mt-2" variant="destructive">
						<AlertCircleIcon className="size-4" />
						<AlertDescription className="text-red-500">
							{quoteForm.formState.errors.root.message}
						</AlertDescription>
					</Alert>
				)}
			</CardHeader>
			<CardContent>
				<Form {...quoteForm}>
					<form
						className="space-y-4"
						onSubmit={quoteForm.handleSubmit(onQuoteSubmit)}
					>
						<WithdrawQuoteFormFields form={quoteForm} />

						<Button
							type="submit"
							disabled={quoteForm.formState.isSubmitting}
							className="w-full"
						>
							{quoteForm.formState.isSubmitting ? (
								<span className="flex items-center gap-2">
									<Loader2 className="size-4 animate-spin" />
									Getting Quote...
								</span>
							) : (
								"Get Quote"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
