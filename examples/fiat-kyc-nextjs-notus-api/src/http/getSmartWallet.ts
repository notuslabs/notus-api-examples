import type { GetSmartWalletSchema } from "@/actions/schemas";

export type GetSmartWalletResponse = {
	wallet: {
		accountAbstraction: string;
		externallyOwnedAccount: string;
	};
};

export async function getSmartWallet(data: GetSmartWalletSchema) {
	const response = await fetch(
		`https://api.notus.team/api/v1/wallets/address?externallyOwnedAccount=${data.externallyOwnedAccount}&factory=${data.factory}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": process.env.NOTUS_API_KEY as string,
			},
		},
	);

	if (!response.ok) {
		const { message } = await response.json();
		throw new Error(message);
	}

	const walletData = (await response.json()) as GetSmartWalletResponse;

	return walletData;
}
