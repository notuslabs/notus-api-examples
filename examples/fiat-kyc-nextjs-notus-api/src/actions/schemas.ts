import z from "zod";

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
