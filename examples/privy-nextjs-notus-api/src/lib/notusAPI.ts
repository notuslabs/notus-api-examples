import "server-only";

import { env } from "@/env";
import ky from "ky";

export const notusAPI = ky.create({
	prefixUrl: "https://api.notus.team/api/v1",
	headers: {
		"x-api-key": env.NOTUS_API_KEY,
	},
});

export const FACTORY_ADDRESS = "0x7a1dbab750f12a90eb1b60d2ae3ad17d4d81effe";
