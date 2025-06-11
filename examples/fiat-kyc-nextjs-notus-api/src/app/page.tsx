import { ContentLayout } from "@/components/content-layout";
import { KYCForm } from "@/components/kyc-form";

export default function Home() {
	return (
		<ContentLayout className="flex flex-col justify-center items-center">
			<KYCForm />
		</ContentLayout>
	);
}
