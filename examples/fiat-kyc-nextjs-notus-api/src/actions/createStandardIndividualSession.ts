"use server";

import { createStandardIndividualSession } from "@/http/createStandardIndividualSession";
import type { CreateStandardIndividualSessionSchema } from "./schemas";

export async function createStandardIndividualSessionAction(
	data: CreateStandardIndividualSessionSchema,
) {
	try {
		const session = await createStandardIndividualSession(data);

		return {
			success: true,
			data: session,
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
