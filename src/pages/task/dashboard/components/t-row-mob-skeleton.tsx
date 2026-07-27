import { Skeleton } from "@/components/ui/skeleton"

const TRowMobSkeleton = () => {
  return (
    <div className="rounded-xl border border-[#eef2fb] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-52" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-[#f1f4fb] pt-3">
        <Skeleton className="h-3 w-28" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default TRowMobSkeleton
