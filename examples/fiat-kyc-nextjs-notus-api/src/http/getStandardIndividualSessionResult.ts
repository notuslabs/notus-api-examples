export type StandardIndividualSessionResult = {
	session: {
		id: string;
		status: "PENDING" | "VERIFYING" | "COMPLETED" | "FAILED";
	};
};

export async function getStandardIndividualSessionResult({
	sessionId,
}: {
	sessionId: string;
}) {
	const response = await fetch(
		`https://api.notus.team/api/v1/kyc/individual-verification-sessions/standard/${sessionId}`,
		{
			headers: {
				"x-api-key": process.env.NOTUS_API_KEY as string,
			},
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	// its recommended to not return the entire session object
	// it might contain sensitive information like the reason why the verification failed
	return (await response.json()) as StandardIndividualSessionResult;
}
