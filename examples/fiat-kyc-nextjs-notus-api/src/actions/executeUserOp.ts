"use server";

import { executeUserOp } from "@/http/executeUserOp";
import type { ExecuteUserOpSchema } from "./schemas";

export async function executeUserOpAction(data: ExecuteUserOpSchema) {
	try {
		const result = await executeUserOp(data);

		return {
			success: true,
			data: result,
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
