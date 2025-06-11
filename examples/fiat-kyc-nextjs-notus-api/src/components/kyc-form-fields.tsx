import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@notus-api-examples/ui/components/form";
import { FormField } from "@notus-api-examples/ui/components/form";
import { Input } from "@notus-api-examples/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@notus-api-examples/ui/components/select";
import type { UseFormReturn } from "react-hook-form";
import type { CreateStandardIndividualSessionFormSchema } from "@/components/kyc-form";

interface KYCFormFieldsProps {
	form: UseFormReturn<CreateStandardIndividualSessionFormSchema>;
}

export function KYCFormFields({ form }: KYCFormFieldsProps) {
	return (
		<>
			<FormField
				control={form.control}
				name="firstName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>First Name</FormLabel>
						<FormControl>
							<Input disabled={form.formState.isSubmitting} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="lastName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Last Name</FormLabel>
						<FormControl>
							<Input disabled={form.formState.isSubmitting} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="birthDate"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Birth Date</FormLabel>
						<FormControl>
							<Input
								disabled={form.formState.isSubmitting}
								type="date"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="documentId"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Document ID</FormLabel>
						<FormControl>
							<Input disabled={form.formState.isSubmitting} {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="documentCategory"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Document Category</FormLabel>
						<FormControl>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger
									disabled={form.formState.isSubmitting}
									className="w-full"
								>
									<SelectValue placeholder="Select a document category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="IDENTITY_CARD">Identity Card</SelectItem>
									<SelectItem value="PASSPORT">Passport</SelectItem>
									<SelectItem value="DRIVERS_LICENSE">
										Driver's License
									</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="documentCountry"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Document Country</FormLabel>
						<FormControl>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger
									disabled={form.formState.isSubmitting}
									className="w-full"
								>
									<SelectValue placeholder="Select a document country" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="US">United States</SelectItem>
									<SelectItem value="BRAZIL">Brazil</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="frontDocumentImage"
				render={({ field: { value, onChange, ...fieldProps } }) => (
					<FormItem>
						<FormLabel>Front Document Image</FormLabel>
						<FormControl>
							<Input
								type="file"
								accept="image/*"
								disabled={form.formState.isSubmitting}
								onChange={(e) => {
									const file = e.target.files?.[0];
									onChange(file);
								}}
								{...fieldProps}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="backDocumentImage"
				render={({ field: { value, onChange, ...fieldProps } }) => (
					<FormItem>
						<FormLabel>Back Document Image</FormLabel>
						<FormControl>
							<Input
								type="file"
								accept="image/*"
								disabled={form.formState.isSubmitting}
								onChange={(e) => {
									const file = e.target.files?.[0];
									onChange(file);
								}}
								{...fieldProps}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
