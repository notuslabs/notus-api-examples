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
	paymentMethodToSend: z.enum(["PIX"]),
	amountToSendInFiatCurrency: z.number().positive().min(0.01),
	cryptoCurrencyToReceive: z.enum(["USDC", "BRZ"]),
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

// Schema for fiat withdraw quote request
export const fiatWithdrawQuoteSchema = z.object({
	chainId: z.number(),
	paymentMethodToReceive: z.enum(["PIX", "BANK_TRANSFER", "WIRE_TRANSFER"]),
	amountToSendInCryptoCurrency: z.string().min(1, "Amount is required"),
	cryptoCurrencyToSend: z.enum(["USDC"]),
});

export type FiatWithdrawQuoteSchema = z.infer<typeof fiatWithdrawQuoteSchema>;

// Schema for fiat withdraw request
export const fiatWithdrawSchema = z.object({
	quoteId: z.string().min(1),
	taxId: z.string().min(1, "Tax ID is required"),
	paymentMethodToReceiveDetails: z.discriminatedUnion("type", [
		z.object({
			type: z.literal("PIX"),
			pixKey: z.string().min(1, "PIX key is required"),
		}),
	]),
	walletAddress: z
		.string()
		.regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
	chainId: z.number(),
});

export type FiatWithdrawSchema = z.infer<typeof fiatWithdrawSchema>;

// Schema for execute user operation request
export const executeUserOpSchema = z.object({
	quoteId: z.string().min(1),
	signature: z.string().min(1, "Signature is required"),
});

export type ExecuteUserOpSchema = z.infer<typeof executeUserOpSchema>;

// Schema for register smart wallet request
export const registerSmartWalletSchema = z.object({
	externallyOwnedAccount: z
		.string()
		.min(1, "Externally owned account is required"),
	factory: z.string().min(1, "Factory is required"),
	salt: z.string().min(1, "Salt is required"),
});

export type RegisterSmartWalletSchema = z.infer<
	typeof registerSmartWalletSchema
>;

// Schema for get smart wallet address request
export const getSmartWalletSchema = z.object({
	externallyOwnedAccount: z
		.string()
		.min(1, "Externally owned account is required"),
	factory: z.string().min(1, "Factory is required"),
});

export type GetSmartWalletSchema = z.infer<typeof getSmartWalletSchema>;
