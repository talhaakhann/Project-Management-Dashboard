import { Loader2 } from "lucide-react"

export function AppLoader() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
                    P
                </div>
                <span className="text-lg font-semibold tracking-tight">Planeflow</span>
            </div>
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </div>
    )
}