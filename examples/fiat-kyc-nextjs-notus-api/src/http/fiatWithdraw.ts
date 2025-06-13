import type { FiatWithdrawSchema } from "@/actions/schemas";

export type FiatWithdrawResponse = {
	withdrawOrder: {
		userOpHash: `0x${string}`;
		orderId: string;
		sentCryptoCurrencyAmount: string;
		receivedFiatCurrencyAmount: string;
		transactionFeeAmount: string;
		estimatedGasFeeAmount: string;
		expiresAt: string;
		monthlyLimit: number;
		monthlyUsed: number;
		monthlyRemaining: number;
	};
};

export async function fiatWithdraw(
	data: FiatWithdrawSchema,
): Promise<FiatWithdrawResponse> {
	const response = await fetch("https://api.notus.team/api/v1/fiat/withdraw", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": process.env.NOTUS_API_KEY as string,
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const withdraw = await response.json();
	return withdraw;
}
