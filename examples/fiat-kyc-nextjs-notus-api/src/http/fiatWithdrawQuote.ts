import type { FiatWithdrawQuoteSchema } from "@/actions/schemas";

export type FiatWithdrawQuoteResponse = {
	withdrawQuote: {
		quoteId: string;
		cryptoCurrencyIn: string;
		fiatCurrencyOut: string;
		amountInCryptoCurrency: string;
		amountInCryptoCurrencyWithoutFees: string;
		estimatedGasFeeInCryptoCurrency: string;
		transactionFeeInCryptoCurrency: string;
		expiresAt: string;
		amountOutInFiatCurrency: string;
	};
};

export async function fiatWithdrawQuote(
	data: FiatWithdrawQuoteSchema,
): Promise<FiatWithdrawQuoteResponse> {
	const response = await fetch(
		"https://api.notus.team/api/v1/fiat/withdraw/quote",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": process.env.NOTUS_API_KEY as string,
			},
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const quote = await response.json();
	return quote;
}
