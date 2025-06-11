import { Form } from "@notus-api-examples/ui/components/form";
import { Button } from "@notus-api-examples/ui/components/button";
import {
	useForm,
	zodResolver,
} from "@notus-api-examples/ui/components/hook-form";
import {
	type CreateStandardIndividualSessionSchema,
	createStandardIndividualSessionSchema,
} from "@/actions/schemas";
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

export function KYCForm() {
	const form = useForm({
		resolver: zodResolver(createStandardIndividualSessionSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			birthDate: "",
			documentId: "",
		},
	});

	const onSubmit = useCallback(
		async (data: CreateStandardIndividualSessionSchema) => {
			const result = await createStandardIndividualSessionAction(data);

			if (!result.success) {
				form.setError("root", {
					message: result.error,
				});
				return;
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
