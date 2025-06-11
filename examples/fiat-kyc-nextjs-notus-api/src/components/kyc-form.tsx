"use client";

import { Form } from "@notus-api-examples/ui/components/form";
import { Button } from "@notus-api-examples/ui/components/button";
import {
	useForm,
	zodResolver,
} from "@notus-api-examples/ui/components/hook-form";
import { createStandardIndividualSessionSchema } from "@/actions/schemas";
import { useCallback } from "react";
import { createStandardIndividualSessionAction } from "@/actions/createStandardIndividualSession";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { KYCFormFields } from "./kyc-form-fields";
import { Alert, AlertTitle } from "@notus-api-examples/ui/components/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@notus-api-examples/ui/components/card";
import { z } from "zod/v4";
import { uploadFile } from "@/lib/uploadFile";
import { processStandardIndividualVerification } from "@/http/ProcessStandardIndividualVerification";
import { getStandardIndividualSessionResultAction } from "@/actions/getStandardIndividualSessionResult";
import { toast } from "sonner";

export const createStandardIndividualSessionFormSchema =
	createStandardIndividualSessionSchema.extend({
		frontDocumentImage: z.file(),
		backDocumentImage: z.file().nullish(),
	});

export type CreateStandardIndividualSessionFormSchema = z.infer<
	typeof createStandardIndividualSessionFormSchema
>;

export function KYCForm() {
	const form = useForm({
		resolver: zodResolver(createStandardIndividualSessionFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			birthDate: "",
			documentId: "",
			frontDocumentImage: null as unknown as File, // satisfy Zod
			backDocumentImage: null,
		},
	});

	const onSubmit = useCallback(
		async (data: CreateStandardIndividualSessionFormSchema) => {
			const { backDocumentImage, frontDocumentImage, ...rest } = data;

			const toastId = toast.loading("KYC Session Verification", {
				description: "Creating your KYC verification session...",
			});
			// Create KYC session (must complete before expiration)
			const result = await createStandardIndividualSessionAction({
				...rest,
			});

			if (!result.success) {
				form.setError("root", {
					message: result.error,
				});
				toast.error("KYC Session Verification", {
					id: toastId,
					description: "Failed to create your KYC verification session",
				});
				return;
			}

			if (result.data.backDocumentUpload && !backDocumentImage) {
				form.setError("backDocumentImage", {
					message: "Back document image is required",
				});
				toast.error("KYC Session Verification", {
					id: toastId,
					description: "Please provide an image of the back of your document",
				});
				return;
			}

			// Upload document images
			toast.loading("KYC Session Verification", {
				id: toastId,
				description: "Uploading your verification documents...",
			});
			await Promise.all([
				uploadFile({
					file: frontDocumentImage,
					url: result.data.frontDocumentUpload.url,
					fields: result.data.frontDocumentUpload.fields,
				}),
				backDocumentImage &&
					result.data.backDocumentUpload &&
					uploadFile({
						file: backDocumentImage,
						url: result.data.backDocumentUpload.url,
						fields: result.data.backDocumentUpload.fields,
					}),
			]);

			// Finalize verification (check status via getResult endpoint)
			// preferrable to call this on the frontend side (no auth required)
			toast.loading("KYC Session Verification", {
				id: toastId,
				description: "Processing your verification documents...",
			});
			await processStandardIndividualVerification({
				sessionId: result.data.session.id,
			});

			while (true) {
				const sessionResult = await getStandardIndividualSessionResultAction({
					sessionId: result.data.session.id,
				});

				if (!sessionResult.success) {
					form.setError("root", {
						message: sessionResult.error,
					});
					toast.error("KYC Session Verification", {
						id: toastId,
						description: "An error occurred while verifying your documents",
					});
					return;
				}

				if (sessionResult.data.session.status !== "VERIFYING") {
					if (sessionResult.data.session.status === "COMPLETED") {
						toast.success("KYC Session Verification", {
							id: toastId,
							description: "Your identity has been successfully verified",
						});
					} else if (sessionResult.data.session.status === "FAILED") {
						toast.error("KYC Session Verification", {
							id: toastId,
							description:
								"We were unable to verify your identity. Please try again",
						});
					}
					break;
				}
			}
		},
		[form],
	);

	return (
		<Card className="w-full max-w-lg">
			<CardHeader>
				<CardTitle>KYC Form</CardTitle>
				<CardDescription>
					Please fill out the form below to submit your KYC information.
				</CardDescription>
				{form.formState.errors.root && (
					<Alert className="mt-2" variant="destructive">
						<AlertCircleIcon className="size-4" />
						<AlertTitle className="text-red-500">
							{form.formState.errors.root.message}
						</AlertTitle>
					</Alert>
				)}
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className="grid grid-cols-2 gap-4 items-start"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<KYCFormFields form={form} />

						<Button
							className="col-span-2"
							type="submit"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? (
								<span className="flex items-center gap-2">
									<Loader2 className="size-4 animate-spin" />
									Submitting...
								</span>
							) : (
								<span className="flex items-center gap-2">Submit</span>
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
