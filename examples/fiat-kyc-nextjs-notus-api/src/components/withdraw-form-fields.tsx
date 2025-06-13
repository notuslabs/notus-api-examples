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
import { fiatWithdrawSchema } from "@/actions/schemas";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@notus-api-examples/ui/components/select";

const withdrawFormSchema = fiatWithdrawSchema.omit({
	quoteId: true,
	walletAddress: true,
});
type WithdrawFormSchema = z.infer<typeof withdrawFormSchema>;

interface WithdrawFormFieldsProps {
	form: UseFormReturn<WithdrawFormSchema>;
}

export function WithdrawFormFields({ form }: WithdrawFormFieldsProps) {
	return (
		<>
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

			<FormField
				control={form.control}
				name="pixKey"
				render={({ field }) => (
					<FormItem>
						<FormLabel>PIX Key</FormLabel>
						<FormControl>
							<Input
								placeholder="Your PIX key (email, phone, CPF, or random key)"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
