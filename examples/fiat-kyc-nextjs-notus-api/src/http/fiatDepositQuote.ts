import type { FiatDepositQuoteSchema } from "@/actions/schemas";

export type FiatDepositQuoteResponse = {
	depositQuote: {
		quoteId: string;
		amountToSend: string;
		amountToReceive: string;
		expiresAt: string;
	};
};

export async function fiatDepositQuote(
	data: FiatDepositQuoteSchema,
): Promise<FiatDepositQuoteResponse> {
	const response = await fetch(
		"https://api.notus.team/api/v1/fiat/deposit/quote",
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
