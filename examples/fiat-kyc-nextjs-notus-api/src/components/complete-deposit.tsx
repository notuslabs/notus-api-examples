import { Form } from "@notus-api-examples/ui/components/form";
import { Button } from "@notus-api-examples/ui/components/button";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
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
import { fiatDepositSchema } from "@/actions/schemas";
import type { FiatDepositQuoteResponse } from "@/http/fiatDepositQuote";
import { QuoteSummary } from "./quote-summary";
import { DepositFormFields } from "./deposit-form-fields";

const depositFormSchema = fiatDepositSchema.omit({ quoteId: true });
type DepositFormSchema = z.infer<typeof depositFormSchema>;

interface CompleteDepositProps {
	quote: FiatDepositQuoteResponse;
	form: UseFormReturn<DepositFormSchema>;
	onSubmit: (data: DepositFormSchema) => Promise<void>;
	onBack: () => void;
}

export function CompleteDeposit({
	quote,
	form,
	onSubmit,
	onBack,
}: CompleteDepositProps) {
	return (
		<Card className="w-full max-w-lg">
			<CardHeader>
				<CardTitle>Complete Deposit</CardTitle>
				<CardDescription>
					Please provide your wallet details to complete the deposit.
				</CardDescription>

				<QuoteSummary quote={quote} />

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
						<DepositFormFields form={form} />

						<div className="flex gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={onBack}
								className="flex-1"
							>
								Back to Quote
							</Button>
							<Button
								type="submit"
								disabled={form.formState.isSubmitting}
								className="flex-1"
							>
								{form.formState.isSubmitting ? (
									<span className="flex items-center gap-2">
										<Loader2 className="size-4 animate-spin" />
										Processing...
									</span>
								) : (
									"Complete Deposit"
								)}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
