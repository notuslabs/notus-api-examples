import { cookies } from "next/headers";
import { privy } from "./privy";
import { notusAPI, FACTORY_ADDRESS } from "./notusAPI";

export async function auth() {
	try {
		const { get } = await cookies();

		const token = get("privy-id-token");

		if (!token) {
			return null;
		}

		let user = await privy.getUser({ idToken: token.value });

		if (!user.wallet?.address) {
			user = await privy.createWallets({
				userId: user.id,
				createEthereumWallet: true,
			});
		}

		const { wallet } = await notusAPI
			.get("wallets/address", {
				searchParams: {
					externallyOwnedAccount: user.wallet?.address as string,
					factory: FACTORY_ADDRESS,
				},
			})
			.json<{
				wallet: { accountAbstraction: string; registeredAt: string | null };
			}>();

		if (!wallet.registeredAt) {
			await notusAPI.post("wallets/register", {
				json: {
					externallyOwnedAccount: user.wallet?.address as string,
					factory: FACTORY_ADDRESS,
					salt: "0",
				},
			});
		}

		return {
			...user,
			accountAbstractionAddress: wallet.accountAbstraction,
		};
	} catch (error) {
		console.error(error);
		return null;
	}
}
