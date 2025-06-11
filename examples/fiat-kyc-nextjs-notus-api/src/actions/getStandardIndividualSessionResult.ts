"use server";

import { getStandardIndividualSessionResult } from "@/http/getStandardIndividualSessionResult";

export async function getStandardIndividualSessionResultAction({
	sessionId,
}: {
	sessionId: string;
}) {
	try {
		const result = await getStandardIndividualSessionResult({ sessionId });

		return {
			success: true,
			data: {
				session: {
					id: result.session.id,
					status: result.session.status,
				},
			},
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
