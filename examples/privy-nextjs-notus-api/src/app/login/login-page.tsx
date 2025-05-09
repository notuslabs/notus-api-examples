"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useLoginWithOAuth } from "@privy-io/react-auth";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import Link from "next/link";

import { Button } from "@notus-api-examples/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@notus-api-examples/ui/components/card";
import { redirect } from "next/navigation";

export default function LoginPage() {
	const { initOAuth, loading } = useLoginWithOAuth();
	const { ready, authenticated } = usePrivy();

	if (loading || !ready)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-pulse">Loading...</div>
			</div>
		);

	if (authenticated) {
		redirect("/");
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
					<CardDescription>
						Sign in to your account using one of the methods below
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Button
						className="w-full cursor-pointer"
						variant="outline"
						onClick={() => initOAuth({ provider: "github" })}
					>
						<SiGithub className="h-4 w-4" />
						Sign in with GitHub
					</Button>
					<Button
						className="w-full cursor-pointer"
						variant="outline"
						onClick={() => initOAuth({ provider: "google" })}
					>
						<SiGoogle className="h-4 w-4" />
						Sign in with Google
					</Button>
				</CardContent>
				<CardFooter className="flex justify-center">
					<span className="text-sm text-muted-foreground">
						By signing in, you agree to our{" "}
						<Link
							href="/privacy-policy"
							className="text-primary hover:underline"
						>
							Privacy Policy
						</Link>
					</span>
				</CardFooter>
			</Card>
		</div>
	);
}
