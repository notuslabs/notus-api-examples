import type { ExecuteUserOpSchema } from "@/actions/schemas";

export type ExecuteUserOpResponse = {
	userOpHash: string;
	userOperationHash: string;
};

export async function executeUserOp(
	data: ExecuteUserOpSchema,
): Promise<ExecuteUserOpResponse> {
	const response = await fetch(
		"https://api.notus.team/api/v1/crypto/execute-user-op",
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
		const error = await response.json();
		throw new Error(error.message);
	}

	const result = await response.json();
	return result;
}
