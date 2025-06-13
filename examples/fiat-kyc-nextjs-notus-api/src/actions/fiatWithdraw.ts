"use server";

import { fiatWithdraw } from "@/http/fiatWithdraw";
import type { FiatWithdrawSchema } from "./schemas";
import { registerSmartWallet } from "@/http/registerSmartWallet";
import { getSmartWallet } from "@/http/getSmartWallet";

export async function fiatWithdrawAction(data: FiatWithdrawSchema) {
	try {
		let smartWallet = await registerSmartWallet({
			externallyOwnedAccount: data.walletAddress,
			factory: "0xe77f2c7d79b2743d39ad73dc47a8e9c6416ad3f3",
			salt: "0",
		});

		if (!smartWallet) {
			smartWallet = await getSmartWallet({
				externallyOwnedAccount: data.walletAddress,
				factory: "0xe77f2c7d79b2743d39ad73dc47a8e9c6416ad3f3",
			});
		}

		const withdraw = await fiatWithdraw({
			...data,
			walletAddress: smartWallet.wallet.accountAbstraction,
		});

		return {
			success: true,
			data: withdraw,
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
