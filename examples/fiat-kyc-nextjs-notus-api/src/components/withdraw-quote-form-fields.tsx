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
import type { fiatWithdrawQuoteSchema } from "@/actions/schemas";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@notus-api-examples/ui/components/select";
import { ArrowUpDown } from "lucide-react";

type WithdrawQuoteFormSchema = z.infer<typeof fiatWithdrawQuoteSchema>;

interface WithdrawQuoteFormFieldsProps {
	form: UseFormReturn<WithdrawQuoteFormSchema>;
}

export function WithdrawQuoteFormFields({
	form,
}: WithdrawQuoteFormFieldsProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<span className="text-sm text-muted-foreground">You'll withdraw</span>
				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="amountInCryptoCurrency"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										type="number"
										step="0.01"
										min="0"
										placeholder="10.00"
										className="w-full"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="cryptoCurrencyIn"
						render={({ field }) => (
							<FormItem className="self-end">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select crypto" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="BRZ">BRZ</SelectItem>
										<SelectItem value="USDC">USDC</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>

			<div className="mx-auto w-fit border rounded-full p-4">
				<ArrowUpDown className="size-4" />
			</div>

			<div className="flex flex-col gap-2">
				<span className="text-sm text-muted-foreground">You'll receive</span>
				<div className="flex gap-2">
					<FormField
						control={form.control}
						name="fiatCurrencyOut"
						render={({ field }) => (
							<FormItem className="w-full">
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select fiat currency" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="BRL">
											R$ - BRL (Brazilian Real)
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="chainId"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select
										onValueChange={(value) => field.onChange(Number(value))}
										defaultValue={field.value.toString()}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select network" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="42161">Arbitrum</SelectItem>
											<SelectItem value="43114">Avalanche</SelectItem>
											<SelectItem value="8453">Base</SelectItem>
											<SelectItem value="56">BSC</SelectItem>
											<SelectItem value="1">Ethereum Mainnet</SelectItem>
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
				</div>
			</div>
		</div>
	);
}
