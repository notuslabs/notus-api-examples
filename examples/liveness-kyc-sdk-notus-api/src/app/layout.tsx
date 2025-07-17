import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@notus-api-examples/ui/globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Liveness KYC SDK Notus API",
	description: "Liveness KYC SDK Notus API",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen`}
			>
				{children}
			</body>
		</html>
	);
}
