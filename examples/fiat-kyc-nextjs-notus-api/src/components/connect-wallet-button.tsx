"use client";

import type React from "react";

import { Button } from "@notus-api-examples/ui/components/button";
import { Wallet, Loader2 } from "lucide-react";
import { useAccount, useConnect } from "wagmi";
import { useState } from "react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@notus-api-examples/ui/components/dialog";

export function ConnectWalletButton({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isConnected } = useAccount();
	const { connectAsync, connectors, isPending: isConnecting } = useConnect();
	const [open, setOpen] = useState(false);
	const [connecting, setConnecting] = useState<string | null>(null);

	const handleConnect = async (connector: (typeof connectors)[0]) => {
		setConnecting(connector.id);
		await connectAsync({ connector });
		setOpen(false);
	};

	if (isConnected) return <>{children}</>;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="gap-2 flex-1">
					<Wallet className="h-4 w-4" />
					Connect Wallet
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Connect Wallet</DialogTitle>
					<DialogDescription>
						Choose your preferred wallet to continue.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-3 py-4">
					{connectors.map((connector) => (
						<Button
							key={connector.id}
							variant="outline"
							onClick={() => handleConnect(connector)}
							disabled={isConnecting}
							className="justify-start gap-3 h-12"
						>
							{isConnecting && connecting === connector.id ? (
								<Loader2 className="h-4 w-4 self-center" />
							) : (
								<img
									src={connector.icon}
									alt={connector.name}
									className="h-4 w-4"
								/>
							)}
							{connector.name}
						</Button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
