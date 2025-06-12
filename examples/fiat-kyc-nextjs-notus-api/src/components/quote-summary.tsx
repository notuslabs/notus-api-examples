import type { FiatDepositQuoteResponse } from "@/http/fiatDepositQuote";

interface QuoteSummaryProps {
	quote: FiatDepositQuoteResponse;
}

export function QuoteSummary({ quote }: QuoteSummaryProps) {
	return (
		<div className="mt-4 p-4 bg-background rounded-lg">
			<h3 className="font-semibold mb-2">Quote Summary</h3>
			<div className="space-y-1 text-sm">
				<div className="flex justify-between">
					<span>Amount to Send:</span>
					<span>{quote.depositQuote.amountToSend}</span>
				</div>
				<div className="flex justify-between">
					<span>Amount to Receive:</span>
					<span>{quote.depositQuote.amountToReceive}</span>
				</div>
				<div className="flex justify-between text-xs text-gray-500">
					<span>Expires:</span>
					<span>{new Date(quote.depositQuote.expiresAt).toLocaleString()}</span>
				</div>
			</div>
		</div>
	);
}
