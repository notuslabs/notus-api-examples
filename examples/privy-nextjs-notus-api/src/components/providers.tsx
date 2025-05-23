"use client";

import { env } from "@/env";
import { PrivyProvider } from "@privy-io/react-auth";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem
			disableTransitionOnChange
		>
			<PrivyProvider
				appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
				clientId={env.NEXT_PUBLIC_PRIVY_CLIENT_ID}
			>
				{children}
			</PrivyProvider>
		</ThemeProvider>
	);
}
