"use client";

import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { ThemeProvider } from "@notus-api-examples/ui/components/theme-provider";
import { Toaster } from "@notus-api-examples/ui/components/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<WagmiProvider config={config}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</WagmiProvider>
		</QueryClientProvider>
	);
}
