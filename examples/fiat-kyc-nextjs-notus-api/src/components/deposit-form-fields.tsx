import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@notus-api-examples/ui/components/form";
import { Input } from "@notus-api-examples/ui/components/input";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod/v4";
import { fiatDepositSchema } from "@/actions/schemas";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@notus-api-examples/ui/components/select";

const depositFormSchema = fiatDepositSchema.omit({ quoteId: true });
type DepositFormSchema = z.infer<typeof depositFormSchema>;

interface DepositFormFieldsProps {
	form: UseFormReturn<DepositFormSchema>;
}

export function DepositFormFields({ form }: DepositFormFieldsProps) {
	return (
		<>
			<FormField
				control={form.control}
				name="walletAddress"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Wallet Address</FormLabel>
						<FormControl>
							<Input placeholder="0x..." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="chainId"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Chain ID</FormLabel>
						<FormControl>
							<Select
								onValueChange={(value) => field.onChange(Number(value))}
								defaultValue={field.value.toString()}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select chain" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="42161">Arbitrum</SelectItem>
									<SelectItem value="43114">Avalanche</SelectItem>
									<SelectItem value="8453">Base</SelectItem>
									<SelectItem value="56">BSC</SelectItem>
									<SelectItem value="1">Mainnet</SelectItem>
									<SelectItem value="10">Optimism</SelectItem>
									<SelectItem value="137">Polygon</SelectItem>
									<SelectItem value="100">Gnosis</SelectItem>
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="taxId"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Tax ID</FormLabel>
						<FormControl>
							<Input placeholder="Your tax ID" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
