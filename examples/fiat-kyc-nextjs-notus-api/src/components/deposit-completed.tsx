import { CheckCircle } from "lucide-react";
import { Button } from "@notus-api-examples/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@notus-api-examples/ui/components/card";
import type { FiatDepositResponse } from "@/http/fiatDeposit";

interface DepositCompletedProps {
	order: FiatDepositResponse;
	onStartNewDeposit: () => void;
}

export function DepositCompleted({
	order,
	onStartNewDeposit,
}: DepositCompletedProps) {
	return (
		<Card className="w-full max-w-lg">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<CheckCircle className="size-5 text-green-500" />
					Success! Your Deposit is Ready
				</CardTitle>
				<CardDescription>
					We've generated a QR code for your deposit. Scan it with your banking
					app to complete the payment. Make sure to pay before the QR code
					expires.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-center">
					<img
						src={`data:image/png;base64,${order.depositOrder.paymentMethodToSendDetails.base64QrCode}`}
						alt="QR Code for deposit"
						className="w-48 h-48"
					/>
				</div>
				<div className="text-sm text-center text-gray-500">
					QR Code expires at:{" "}
					{new Date(order.depositOrder.expiresAt).toLocaleString()}
				</div>
				<Button onClick={onStartNewDeposit} className="w-full">
					Start New Deposit
				</Button>
			</CardContent>
		</Card>
	);
}
