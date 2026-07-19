import { Skeleton } from "@/components/ui/skeleton"

export function ProjectDetailSkeleton() {
    return (
        <div className="mx-auto mt-5 flex w-full max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <Skeleton className="h-7 w-64" />

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="size-5 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>

                    <Skeleton className="h-4 w-28 mt-2" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                </div>
                <Skeleton className="size-9 shrink-0 rounded-md" />
            </div>

            <div className="flex flex-col gap-8">
                {/* Members */}
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-16" />
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 rounded-lg border bg-card p-2"
                            >
                                <Skeleton className="size-6 rounded-full" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Created by */}
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20" />
                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2 rounded-lg border bg-card p-2">
                            <Skeleton className="size-6 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </div>

                {/* Tabs / dates */}
                <div className="mb-2 flex flex-col gap-3">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-48" />
                </div>
            </div>
        </div>
    )
}
