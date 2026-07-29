import Loader from '@/components/loader'

interface EmptyProps {
  isLoading: boolean
  error: string | null
}

const Empty = ({ isLoading, error }: EmptyProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 bg-white p-16 text-sm text-[#68758f]">
        <Loader size={18} className="animate-spin" />
        Loading test…
      </div>
    )
  } else if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 bg-white p-16 text-center">
        <p className="text-sm text-[#e5646d]">{error ?? "Test not found"}</p>
      </div>
    )
  }
  return null;
}

export default Empty