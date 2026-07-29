import { Loader2Icon } from "lucide-react"

const PageLoader = () => {
  return (
    <div
      className="flex min-h-screen w-full items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <Loader2Icon className="size-8 animate-spin text-muted-foreground" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export default PageLoader
