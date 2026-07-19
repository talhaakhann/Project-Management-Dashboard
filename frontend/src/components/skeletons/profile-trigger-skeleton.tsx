import { Skeleton } from "@/components/ui/skeleton"

export function ProfileTriggerSkeleton() {
    return (
        <>
            <Skeleton className="size-8 rounded-lg" />
            <div className="grid flex-1 gap-1.5 text-left">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="ml-auto size-4 rounded-sm" />
        </>
    )
}
