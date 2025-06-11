import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@notus-api-examples/ui/globals.css";
import { ThemeProvider } from "@notus-api-examples/ui/components/theme-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Notus KYC Demo",
	description:
		"A demo application showcasing Notus KYC integration with Next.js",
	keywords: ["KYC", "Notus", "Next.js", "Demo"],
	authors: [{ name: "Notus Labs" }],
	viewport: "width=device-width, initial-scale=1",
	robots: "index, follow",
	openGraph: {
		title: "Notus KYC Demo",
		description:
			"A demo application showcasing Notus KYC integration with Next.js",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
