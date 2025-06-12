"use server";

import { fiatDeposit } from "@/http/fiatDeposit";
import type { FiatDepositSchema } from "./schemas";

export async function fiatDepositAction(data: FiatDepositSchema) {
	try {
		const deposit = await fiatDeposit(data);

		return {
			success: true,
			data: deposit,
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
