import type { FiatDepositSchema } from "@/actions/schemas";

export type FiatDepositResponse = {
	depositOrder: {
		expiresAt: string;
		orderId: string;
		paymentMethodToSendDetails: {
			type: "PIX";
			base64QrCode: string;
			pixKey: string;
		};
	};
};

export async function fiatDeposit(
	data: FiatDepositSchema,
): Promise<FiatDepositResponse> {
	const response = await fetch("https://api.notus.team/api/v1/fiat/deposit", {
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

	const deposit = await response.json();

	return deposit;
}
