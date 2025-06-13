"use server";

import { fiatWithdrawQuote } from "@/http/fiatWithdrawQuote";
import type { FiatWithdrawQuoteSchema } from "./schemas";

export async function fiatWithdrawQuoteAction(data: FiatWithdrawQuoteSchema) {
	try {
		const quote = await fiatWithdrawQuote(data);

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
