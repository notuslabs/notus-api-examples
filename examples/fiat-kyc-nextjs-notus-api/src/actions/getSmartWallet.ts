"use server";

import { getSmartWallet } from "@/http/getSmartWallet";

export async function getSmartWalletAction({
	externallyOwnedAccount,
	factory,
}: {
	externallyOwnedAccount: string;
	factory: string;
}) {
	try {
		const smartWallet = await getSmartWallet({
			externallyOwnedAccount,
			factory,
		});

		return {
			success: true,
			data: smartWallet,
			error: null,
		} as const;
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				error: error.message,
				data: null,
			} as const;
		}

		return {
			success: false,
			error: "An unexpected error occurred",
			data: null,
		} as const;
	}
}
