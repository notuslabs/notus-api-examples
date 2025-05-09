import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		PRIVY_APP_SECRET: z.string().min(1),
		NOTUS_API_KEY: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_PRIVY_APP_ID: z.string().min(1),
		NEXT_PUBLIC_PRIVY_CLIENT_ID: z.string().min(1),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
		NEXT_PUBLIC_PRIVY_CLIENT_ID: process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID,
	},
});
