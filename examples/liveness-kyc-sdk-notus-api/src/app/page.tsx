"use client";

import { Button } from "@notus-api-examples/ui/components/button";
import { Input } from "@notus-api-examples/ui/components/input";
import { Liveness } from "@notus-api/react-sdk";
import { useState } from "react";

export default function Home() {
	const [showLiveness, setShowLiveness] = useState(false);
	const [sessionId, setSessionId] = useState("");

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
			{showLiveness ? (
				<Liveness
					baseUrl="https://feat-sdk-web.d1aqwitgt3mie1.amplifyapp.com"
					language="pt"
					onError={(error) => {
						console.error(error);
						setShowLiveness(false);
					}}
					onSuccess={() => {
						console.log("success");
						setShowLiveness(false);
					}}
					sessionId={sessionId}
				/>
			) : (
				<>
					<Input
						type="text"
						placeholder="Enter your name"
						className="max-w-sm"
						value={sessionId}
						onChange={(e) => setSessionId(e.target.value)}
					/>
					<Button onClick={() => setShowLiveness(true)}>
						Start Liveness Check
					</Button>
				</>
			)}
		</div>
	);
}
