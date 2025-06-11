export async function processStandardIndividualVerification({
	sessionId,
}: {
	sessionId: string;
}): Promise<void> {
	const response = await fetch(
		`https://api.notus.team/api/v1/kyc/individual-verification-sessions/standard/${sessionId}/process`,
		{
			method: "POST",
		},
	);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}
}
