import { auth } from "@/lib/auth";
import LoginPage from "./login-page";
import { redirect } from "next/navigation";

export default async function Page() {
	const user = await auth();

	if (user) {
		redirect("/");
	}

	return <LoginPage />;
}
