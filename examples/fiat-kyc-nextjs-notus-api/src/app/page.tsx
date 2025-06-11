"use client";

import { ContentLayout } from "@/components/content-layout";
import { KYCForm } from "@/components/kyc-form";
import { useState } from "react";
import { Button } from "@notus-api-examples/ui/components/button";

export default function Home() {
	const [isFlipped, setIsFlipped] = useState(false);

	return (
		<ContentLayout className="flex flex-col justify-center items-center min-h-screen">
			<div className="w-full max-w-lg [perspective:1000px]">
				<div
					className={`relative w-full text-center transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
				>
					<div className="[backface-visibility:hidden] rounded-lg">
						<KYCForm />
					</div>
					<div className="absolute inset-0 [backface-visibility:hidden] bg-blue-600 text-white rounded-lg [transform:rotateY(180deg)] flex flex-col justify-center items-center shadow-lg">
						<h1 className="text-4xl font-bold">Hello</h1>
						<p className="mt-4">This is the back side!</p>
					</div>
				</div>
			</div>
			<Button onClick={() => setIsFlipped(!isFlipped)} className="mt-6">
				{isFlipped ? "Show Form" : "Show Hello"}
			</Button>
		</ContentLayout>
	);
}
