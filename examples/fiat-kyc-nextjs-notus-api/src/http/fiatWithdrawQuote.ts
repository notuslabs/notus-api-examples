import type { FiatWithdrawQuoteSchema } from "@/actions/schemas";

export type FiatWithdrawQuoteResponse = {
	withdrawQuote: {
		quoteId: string;
		cryptoCurrencyToSend: string;
		fiatCurrencyToReceive: string;
		amountToSendInCryptoCurrency: string;
		amountToReceiveInFiatCurrency: string;
		transactionFeeInCryptoCurrency: string;
		estimatedGasFeeInCryptoCurrency: string;
		expiresAt: string;
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
		console.log("error", JSON.stringify(error, null, 2));
		throw new Error(error.message);
	}

	const quote = await response.json();
	return quote;
}
