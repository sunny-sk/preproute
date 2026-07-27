import { Skeleton } from "@/components/ui/skeleton"

const TRowSkeleton = () => {
  return (
    <tr>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-2 h-3 w-28" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="px-3 py-4">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center justify-end gap-1">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </td>
    </tr>
  )
}

export default TRowSkeleton
