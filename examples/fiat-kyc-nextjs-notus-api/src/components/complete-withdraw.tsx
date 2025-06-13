import { Form } from "@notus-api-examples/ui/components/form";
import { Button } from "@notus-api-examples/ui/components/button";
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
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod/v4";
import { fiatWithdrawSchema } from "@/actions/schemas";
import type { FiatWithdrawQuoteResponse } from "@/http/fiatWithdrawQuote";
import { WithdrawQuoteSummary } from "./withdraw-quote-summary";
import { WithdrawFormFields } from "./withdraw-form-fields";
import { ConnectWalletButton } from "./connect-wallet-button";
import { useAccount } from "wagmi";
import { getSmartWalletAction } from "@/actions/getSmartWallet";

const withdrawFormSchema = fiatWithdrawSchema.omit({
	quoteId: true,
	walletAddress: true,
});
type WithdrawFormSchema = z.infer<typeof withdrawFormSchema>;

interface CompleteWithdrawProps {
	quote: FiatWithdrawQuoteResponse;
	form: UseFormReturn<WithdrawFormSchema>;
	onSubmit: (data: WithdrawFormSchema) => Promise<void>;
	onBack: () => void;
}

export function CompleteWithdraw({
	quote,
	form,
	onSubmit,
	onBack,
}: CompleteWithdrawProps) {
	return (
		<Card className="w-full max-w-lg">
			<CardHeader>
				<CardTitle>Complete Withdrawal</CardTitle>
				<CardDescription>
					Please provide your wallet and PIX details to complete the withdrawal.
				</CardDescription>

				<WithdrawQuoteSummary quote={quote} />

				{form.formState.errors.root && (
					<Alert className="mt-2" variant="destructive">
						<AlertCircleIcon className="size-4" />
						<AlertDescription>
							{form.formState.errors.root.message}
						</AlertDescription>
					</Alert>
				)}
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<WithdrawFormFields form={form} />

						<div className="flex gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={onBack}
								className="flex-1"
							>
								Back to Quote
							</Button>
							<ConnectWalletButton>
								<Button
									className="flex-1"
									type="submit"
									disabled={form.formState.isSubmitting}
								>
									{form.formState.isSubmitting ? (
										<span className="flex items-center gap-2">
											<Loader2 className="size-4 animate-spin" />
											Processing...
										</span>
									) : (
										"Create Withdrawal Order"
									)}
								</Button>
							</ConnectWalletButton>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
