import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutPage from "./logout-page";

export default async function Page() {
	const user = await auth();

	if (!user) {
		redirect("/login");
	}

	return <LogoutPage />;
}
