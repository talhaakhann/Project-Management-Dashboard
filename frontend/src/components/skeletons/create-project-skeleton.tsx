import { Skeleton } from "@/components/ui/skeleton"

export function CreateProjectSkeleton() {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
            <div>
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-4 w-56 mt-2" />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-3 w-64" />
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-9 w-full" />
                </div>

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-28" />
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-8 w-24 rounded-md" />
                        <Skeleton className="h-8 w-28 rounded-md" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                        <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-28" />
            </div>
        </div>
    )
}
