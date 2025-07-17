import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import type { ReactNode } from "react";
import { web3AuthContextConfig } from "../config";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
	return (
		<Web3AuthProvider config={web3AuthContextConfig}>
			<QueryClientProvider client={queryClient}>
				<WagmiProvider>{children}</WagmiProvider>
			</QueryClientProvider>
		</Web3AuthProvider>
	);
}
