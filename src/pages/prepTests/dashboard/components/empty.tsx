import { Search } from "lucide-react"

type EmptyStateProps = {
  title?: string
  description?: string
}

const EmptyState = ({
  title = "No tests yet",
  description = "Create your first test to get started.",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-3 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ff] text-[#4f6fff]">
        <Search size={20} />
      </div>
      <p className="mt-4 text-sm font-medium text-[#33415c]">{title}</p>
      <p className="mt-1 text-sm text-[#8a95ad]">{description}</p>
    </div>
  )
}

export default EmptyState
