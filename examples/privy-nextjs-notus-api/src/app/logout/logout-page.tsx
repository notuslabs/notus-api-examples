"use client";

import { useLogout, usePrivy } from "@privy-io/react-auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
	const { ready } = usePrivy();
	const { logout } = useLogout({
		onSuccess() {
			redirect("/login");
		},
	});

	useEffect(() => {
		if (!ready) return;

		logout();
	}, [logout, ready]);

	return <div>Signing out...</div>;
}
