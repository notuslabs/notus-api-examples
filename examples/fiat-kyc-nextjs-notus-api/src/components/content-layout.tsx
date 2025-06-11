import { cn } from "@notus-api-examples/ui/lib/utils";

export function ContentLayout({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("container mx-auto w-full h-full", className)}>
			{children}
		</div>
	);
}
