import type { CreateStandardIndividualSessionSchema } from "@/actions/schemas";

export type DocumentUpload = {
	url: string;
	fields: {
		bucket: string;
		"X-Amz-Algorithm": string;
		"X-Amz-Credential": string;
		"X-Amz-Date": string;
		key: string;
		Policy: string;
		"X-Amz-Signature": string;
	};
};

export type CreateStandardIndividualSessionResponse = {
	session: {
		id: string;
		firstName: string;
		lastName: string;
		birthDate: string;
		document: {
			id: string;
			type: string | null;
			category: string;
		};
		status: string;
		livenessRequired: boolean;
		createdAt: string;
		updatedAt: string | null;
	};
	frontDocumentUpload: DocumentUpload;
	backDocumentUpload: DocumentUpload | null;
};

export async function createStandardIndividualSession(
	data: CreateStandardIndividualSessionSchema,
): Promise<CreateStandardIndividualSessionResponse> {
	const response = await fetch(
		"https://api.notus.team/api/v1/kyc/individual-verification-sessions/standard",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": process.env.NOTUS_API_KEY as string,
			},
			body: JSON.stringify({
				...data,
				livenessRequired: false,
			}),
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	const session = await response.json();

	return session;
}
