export async function uploadFile({
	file,
	url,
	fields,
}: {
	file: File;
	url: string;
	fields: Record<string, string>;
}) {
	const formData = new FormData();
	for (const [key, value] of Object.entries(fields)) {
		formData.append(key, value);
	}

	formData.append("file", file);

	const response = await fetch(url, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error(`Failed to upload file: ${response.statusText}`);
	}

	return response;
}
