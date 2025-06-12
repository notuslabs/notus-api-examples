"use server";

import { fiatDepositQuote } from "@/http/fiatDepositQuote";
import type { FiatDepositQuoteSchema } from "./schemas";

export async function fiatDepositQuoteAction(data: FiatDepositQuoteSchema) {
	try {
		const quote = await fiatDepositQuote(data);

		return {
			success: true,
			data: quote,
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
