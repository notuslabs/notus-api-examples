import { ContentLayout } from "@/components/content-layout";
import { OnRampForm } from "@/components/onramp-form";

export default function Onramp() {
	return (
		<ContentLayout className="flex flex-col justify-center items-center">
			<OnRampForm />
		</ContentLayout>
	);
}
