import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
	const user = await auth();

	if (!user) {
		redirect("/login");
	}

	return (
		<div>
			<h1>Privy NextJS Notus API</h1>
			<p>Externally Owned Account: {user.wallet?.address}</p>
			<p>Account Abstraction Address: {user.accountAbstractionAddress}</p>
		</div>
	);
}
