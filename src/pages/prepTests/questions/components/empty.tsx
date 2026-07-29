
import { Loader2Icon } from 'lucide-react'

interface EmptyProps {
  isLoading: boolean
  error: string | null
}

const Empty = ({ isLoading, error }: EmptyProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 bg-white p-16 text-sm text-body-subtle">
        <Loader2Icon className="animate-spin" aria-hidden="true" />
        Loading test…
      </div>
    )
  } else if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 bg-white p-16 text-center">
        <p className="text-sm text-destructive">{error ?? "Test not found"}</p>
      </div>
    )
  }
  return null;
}

export default Empty