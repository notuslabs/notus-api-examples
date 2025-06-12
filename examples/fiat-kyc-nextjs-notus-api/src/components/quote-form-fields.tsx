import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@notus-api-examples/ui/components/form";
import { Input } from "@notus-api-examples/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@notus-api-examples/ui/components/select";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod/v4";
import type { fiatDepositQuoteSchema } from "@/actions/schemas";
import { ArrowUpDown } from "lucide-react";

type QuoteFormSchema = z.infer<typeof fiatDepositQuoteSchema>;

interface QuoteFormFieldsProps {
	form: UseFormReturn<QuoteFormSchema>;
	requestQuote: (data: QuoteFormSchema) => void;
}

export function QuoteFormFields({ form }: QuoteFormFieldsProps) {
	return (
		<div className="flex flex-col gap-2">
			<span className="text-sm text-muted-foreground">You'll pay</span>
			<div className="flex gap-2">
				<FormField
					control={form.control}
					name="amountInFiatCurrency"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									type="number"
									className="w-full"
									{...field}
									onChange={(e) => field.onChange(e.target.valueAsNumber)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="fiatCurrency"
					render={({ field }) => (
						<FormItem className="self-end">
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select currency" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="BRL">R$ - BRL</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="mx-auto w-fit border rounded-full p-4">
				<ArrowUpDown className="size-4" />
			</div>

			<FormField
				control={form.control}
				name="cryptoCurrency"
				render={({ field }) => (
					<FormItem className="w-full">
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormLabel className="text-sm text-muted-foreground">
								You'll receive
							</FormLabel>
							<FormControl>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select currency" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="BRZ">
									BRZ - Brazilian Digital Asset
								</SelectItem>
								<SelectItem value="USDC">USDC - USD Coin</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
