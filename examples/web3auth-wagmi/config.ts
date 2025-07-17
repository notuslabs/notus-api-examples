import { WEB3AUTH_NETWORK } from "@web3auth/modal";
import type { Web3AuthContextConfig } from "@web3auth/modal/react";

const clientId =
	"BO1hOVkIpyMVDUvPUf42gpOsgsSVhbtSwM4_6Jcmfxz_g3Qcbjpzcf5p6FP3Ghopk1rJS8s7vGlLPMnnUiwJRFc";

export const web3AuthContextConfig: Web3AuthContextConfig = {
	web3AuthOptions: {
		clientId,
		web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
	},
};
