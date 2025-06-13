import type { RegisterSmartWalletSchema } from "@/actions/schemas";

export type RegisterSmartWalletResponse = {
	wallet: {
		accountAbstraction: string;
	};
};

export async function registerSmartWallet(data: RegisterSmartWalletSchema) {
	const response = await fetch(
		"https://api.notus.team/api/v1/wallets/register",
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
		const { id, message } = await response.json();
		if (id === "WALLET_ALREADY_REGISTERED") {
			return null;
		}

		throw new Error(message);
	}

	const walletData = (await response.json()) as RegisterSmartWalletResponse;

	return walletData;
}
