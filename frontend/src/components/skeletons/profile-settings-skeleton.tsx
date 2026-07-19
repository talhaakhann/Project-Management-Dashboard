import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSettingsSkeleton() {
    return (
        <div className="p-4">
            <div>
                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-56" />
                    </div>
                    <Skeleton className="h-9 w-full sm:w-36" />
                </div>

                <div className="flex flex-col gap-6 mt-6">
                    {/* Avatar upload */}
                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-4 w-32" />
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Skeleton className="size-24 shrink-0 rounded-full" />
                            <div className="flex flex-1 flex-col gap-2">
                                <Skeleton className="h-9 w-full sm:w-36" />
                                <Skeleton className="h-3 w-64" />
                            </div>
                        </div>
                    </div>

                    <Skeleton className="h-px w-full" />

                    {/* Basic info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
