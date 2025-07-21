import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
	return (
		<main className="space-y-3">
			<div className="mb-6 flex px-3 sm:px-0 items-center gap-3 flex-col sm:flex-row">
				<Skeleton className="w-1/3 sm:w-28 aspect-square rounded-full shrink-0" />
				<div className="flex flex-col items-center sm:items-start gap-3">
					<Skeleton className="w-[225px] sm:w-[300px] h-12 sm:h-6" />
					<Skeleton className="w-[350px] sm:w-[400px] h-12" />
				</div>
			</div>
			<Skeleton className="h-[107px] rounded-none sm:rounded-xl" />
			<Skeleton className="h-[434px] rounded-none sm:rounded-xl" />
			<Skeleton className="h-[868px] rounded-none sm:rounded-xl" />
		</main>
	);
}

