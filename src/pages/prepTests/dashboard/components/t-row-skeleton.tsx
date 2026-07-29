import { Skeleton } from "@/components/ui/skeleton"
import { ROW_GRID } from "./columns"

const TRowSkeleton = () => {
  return (
    <div className={`${ROW_GRID} border-b border-line px-3 py-4`}>
      <div>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-3 w-28" />
      </div>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-4 w-24" />
      <div className="flex items-center justify-end gap-1">
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>
    </div>
  )
}

export default TRowSkeleton
