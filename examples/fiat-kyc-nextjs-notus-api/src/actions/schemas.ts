import { z } from "zod/v4";

// Schema for form input (what the form receives)
export const createStandardIndividualSessionSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	birthDate: z.string().min(1),
	documentId: z.string().regex(/\d+$/, "Must contain only digits"),
	documentCategory: z.enum(["IDENTITY_CARD", "PASSPORT", "DRIVERS_LICENSE"]),
	documentCountry: z.enum(["US", "BRAZIL"]),
});

export type CreateStandardIndividualSessionSchema = z.infer<
	typeof createStandardIndividualSessionSchema
>;

// Schema for fiat deposit quote request
export const fiatDepositQuoteSchema = z.object({
	fiatCurrency: z.enum(["BRL"]),
	amountInFiatCurrency: z.number().positive().min(1),
	cryptoCurrency: z.enum(["USDC", "BRZ"]),
});

export type FiatDepositQuoteSchema = z.infer<typeof fiatDepositQuoteSchema>;

// Schema for fiat deposit request
export const fiatDepositSchema = z.object({
	quoteId: z.string().min(1),
	walletAddress: z
		.string()
		.regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
	chainId: z.number(),
	taxId: z.string({ error: "Tax ID is required" }).min(1, "Tax ID is required"),
});

export type FiatDepositSchema = z.infer<typeof fiatDepositSchema>;
