import { Skeleton } from "../ui/skeleton"


function AuthInitializerSkeleton() {
    return (
        <div className="flex min-h-screen w-full">
            {/* Sidebar */}
            <div className="hidden md:flex w-64 shrink-0 flex-col gap-6 border-r p-4">
                <div className="flex items-center gap-2">
                    <Skeleton className="size-8 rounded-lg" />
                    <Skeleton className="h-5 w-28" />
                </div>
                <div className="flex flex-col gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full rounded-md" />
                    ))}
                </div>
                <div className="mt-auto flex items-center gap-2">
                    <Skeleton className="size-8 rounded-lg" />
                    <div className="flex flex-1 flex-col gap-1.5">
                        <Skeleton className="h-3.5 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-7 w-40" />
                        <Skeleton className="h-9 w-28" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full rounded-lg" />
                        ))}
                    </div>
                    <Skeleton className="h-64 w-full rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export default AuthInitializerSkeleton