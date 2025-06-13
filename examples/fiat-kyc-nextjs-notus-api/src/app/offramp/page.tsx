import { ContentLayout } from "@/components/content-layout";
import { OffRampForm } from "@/components/offramp-form";

export default function Offramp() {
	return (
		<ContentLayout className="flex flex-col justify-center items-center">
			<OffRampForm />
		</ContentLayout>
	);
}
