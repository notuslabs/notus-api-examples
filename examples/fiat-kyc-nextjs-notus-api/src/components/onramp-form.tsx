"use client";

import { Form } from "@notus-api-examples/ui/components/form";
import { Button } from "@notus-api-examples/ui/components/button";
import {
	useForm,
	zodResolver,
} from "@notus-api-examples/ui/components/hook-form";
import {
	fiatDepositQuoteSchema,
	fiatDepositSchema,
	type FiatDepositQuoteSchema,
} from "@/actions/schemas";
import { useCallback, useState } from "react";
import { fiatDepositQuoteAction } from "@/actions/fiatDepositQuote";
import { fiatDepositAction } from "@/actions/fiatDeposit";
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
import type { FiatDepositQuoteResponse } from "@/http/fiatDepositQuote";
import { DepositCompleted } from "./deposit-completed";
import { CompleteDeposit } from "./complete-deposit";
import { QuoteFormFields } from "./quote-form-fields";
import type { FiatDepositResponse } from "@/http/fiatDeposit";

const quoteFormSchema = fiatDepositQuoteSchema;
const depositFormSchema = fiatDepositSchema.omit({ quoteId: true });

type QuoteFormSchema = z.infer<typeof quoteFormSchema>;
type DepositFormSchema = z.infer<typeof depositFormSchema>;

export function OnRampForm() {
	const [step, setStep] = useState<"quote" | "deposit" | "completed">("quote");
	const [quote, setQuote] = useState<FiatDepositQuoteResponse | null>(null);
	const [order, setOrder] = useState<FiatDepositResponse | null>(null);

	const quoteForm = useForm<FiatDepositQuoteSchema>({
		resolver: zodResolver(fiatDepositQuoteSchema),
		defaultValues: {
			paymentMethodToSend: "PIX" as const,
			amountToSendInFiatCurrency: 10,
			cryptoCurrencyToReceive: "BRZ" as const,
		},
	});

	const depositForm = useForm({
		resolver: zodResolver(depositFormSchema),
		defaultValues: {
			walletAddress: "",
			chainId: 137,
			taxId: "",
		},
	});

	const onQuoteSubmit = useCallback(
		async (data: QuoteFormSchema) => {
			const toastId = toast.loading("Getting Quote", {
				description: "Fetching your deposit quote...",
			});

			const result = await fiatDepositQuoteAction(data);

			if (!result.success) {
				quoteForm.setError("root", {
					message: result.error,
				});
				toast.error("Quote Request Failed", {
					id: toastId,
					description: "Failed to get deposit quote",
				});
				return;
			}

			setQuote(result.data);
			setStep("deposit");
			toast.success("Quote Retrieved", {
				id: toastId,
				description: "Your deposit quote is ready!",
			});
		},
		[quoteForm],
	);

	const onDepositSubmit = useCallback(
		async (data: DepositFormSchema) => {
			if (!quote) return;

			const toastId = toast.loading("Processing Deposit", {
				description: "Processing your fiat deposit...",
			});

			const result = await fiatDepositAction({
				...data,
				quoteId: quote.depositQuote.quoteId,
			});

			if (!result.success) {
				depositForm.setError("root", {
					message: result.error,
				});
				toast.error("Deposit Failed", {
					id: toastId,
					description: "Failed to process your deposit",
				});
				return;
			}

			setOrder(result.data);

			setStep("completed");
			toast.success("Deposit Successful", {
				id: toastId,
				description: "Your fiat deposit has been processed successfully!",
			});
		},
		[depositForm, quote],
	);

	const resetForm = () => {
		setStep("quote");
		setQuote(null);
		quoteForm.reset();
		depositForm.reset();
	};

	if (step === "completed" && order) {
		return <DepositCompleted order={order} onStartNewDeposit={resetForm} />;
	}

	if (step === "deposit" && quote) {
		return (
			<CompleteDeposit
				quote={quote}
				form={depositForm}
				onSubmit={onDepositSubmit}
				onBack={() => {
					setStep("quote");
					resetForm();
				}}
			/>
		);
	}

	return (
		<Card className="w-full max-w-lg">
			<CardHeader>
				<CardTitle>Fiat On-Ramp</CardTitle>
				<CardDescription>
					Get a quote for your fiat to crypto deposit.
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
						<QuoteFormFields form={quoteForm} requestQuote={onQuoteSubmit} />

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
