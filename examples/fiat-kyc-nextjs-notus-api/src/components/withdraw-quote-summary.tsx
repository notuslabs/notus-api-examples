import { getSmartWalletAction } from "@/actions/getSmartWallet";
import type { FiatWithdrawQuoteResponse } from "@/http/fiatWithdrawQuote";
import type { GetSmartWalletResponse } from "@/http/getSmartWallet";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";

interface WithdrawQuoteSummaryProps {
	quote: FiatWithdrawQuoteResponse;
}

export function WithdrawQuoteSummary({ quote }: WithdrawQuoteSummaryProps) {
	const { address } = useAccount();
	const [smartWallet, setSmartWallet] = useState<GetSmartWalletResponse | null>(
		null,
	);

	useMemo(() => {
		async function getSmartWallet() {
			if (!address) return null;
			const result = await getSmartWalletAction({
				externallyOwnedAccount: address,
				factory: "0xe77f2c7d79b2743d39ad73dc47a8e9c6416ad3f3",
			});

			setSmartWallet(result.data);
		}

		getSmartWallet();
	}, [address]);

	return (
		<div className="mt-4 p-4 bg-background rounded-lg">
			<h3 className="font-semibold mb-2">Withdrawal Quote Summary</h3>
			<div className="space-y-1 text-sm">
				<div className="flex justify-between">
					<span>Amount to Withdraw:</span>
					<span>
						{quote.withdrawQuote.amountToSendInCryptoCurrency}{" "}
						{quote.withdrawQuote.cryptoCurrencyToSend}
					</span>
				</div>
				<div className="flex justify-between">
					<span>Amount After Fees:</span>
					<span>
						{quote.withdrawQuote.amountToSendInCryptoCurrency}{" "}
						{quote.withdrawQuote.cryptoCurrencyToSend}
					</span>
				</div>
				<div className="flex justify-between">
					<span>Estimated Gas Fee:</span>
					<span>
						{quote.withdrawQuote.estimatedGasFeeInCryptoCurrency}{" "}
						{quote.withdrawQuote.cryptoCurrencyToSend}
					</span>
				</div>
				{smartWallet?.wallet && (
					<div className="flex justify-between">
						<span>AA Address:</span>
						<span>{smartWallet.wallet.accountAbstraction}</span>
					</div>
				)}
				<div className="flex justify-between font-semibold">
					<span>You'll Receive:</span>
					<span>
						{quote.withdrawQuote.amountToReceiveInFiatCurrency}{" "}
						{quote.withdrawQuote.fiatCurrencyToReceive}
					</span>
				</div>
				<div className="flex justify-between text-xs text-gray-500">
					<span>Expires:</span>
					<span>
						{new Date(quote.withdrawQuote.expiresAt).toLocaleString()}
					</span>
				</div>
			</div>
		</div>
	);
}
