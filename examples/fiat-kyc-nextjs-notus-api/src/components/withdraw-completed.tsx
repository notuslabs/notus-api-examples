import { CheckCircle } from "lucide-react";
import { Button } from "@notus-api-examples/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@notus-api-examples/ui/components/card";
import type { ExecuteUserOpResponse } from "@/http/executeUserOp";

interface WithdrawCompletedProps {
	result: ExecuteUserOpResponse;
	onStartNewWithdraw: () => void;
}

export function WithdrawCompleted({
	result,
	onStartNewWithdraw,
}: WithdrawCompletedProps) {
	return (
		<Card className="w-full max-w-lg">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<CheckCircle className="size-5 text-green-500" />
					Withdrawal Successfully Executed!
				</CardTitle>
				<CardDescription>
					Your withdrawal has been successfully submitted to the blockchain. The
					funds will be transferred to your PIX account once the transaction is
					confirmed.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="p-4 bg-background rounded-lg">
					<h3 className="font-semibold mb-2">Transaction Details</h3>
					<div className="space-y-2 text-sm">
						<div>
							<span className="text-gray-600">User Operation Hash:</span>
							<p className="font-mono text-xs break-all mt-1">
								{result.userOpHash}
							</p>
						</div>
					</div>
				</div>

				<div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
					<strong>Next Steps:</strong>
					<ul className="list-disc list-inside mt-1 space-y-1">
						<li>Your transaction is being processed on the blockchain</li>
						<li>
							You'll receive the BRL amount in your PIX account once confirmed
						</li>
						<li>This usually takes a few minutes to complete</li>
					</ul>
				</div>

				<Button onClick={onStartNewWithdraw} className="w-full">
					Start New Withdrawal
				</Button>
			</CardContent>
		</Card>
	);
}
