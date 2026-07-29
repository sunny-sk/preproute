import { Eye, Pencil } from "lucide-react"
import StatusBadge from "./status-badge"
import DeleteTestButton from "./delete-test-button"
import type { Test } from "@/types"
import { formatDate } from "@/utils/helper"

type TRowMobProps = {
  test: Test
  onDeleted: (id: string) => void
}

const TRowMob = ({ test, onDeleted }: TRowMobProps) => {
  return (
    <div
      key={test.id}
      className="rounded-xl border border-[#eef2fb] bg-white p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#2f3b52]">{test.name}</p>
          <p className="mt-0.5 text-xs text-[#9aa6be]">
            {test.subject} · {test.questions?.length} Questions ·{" "}
            {test.total_time} min
          </p>
        </div>
        <StatusBadge status={test.status} />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-[#f1f4fb] pt-3">
        <span className="text-xs text-[#8a95ad]">
          Created {formatDate(test.created_at)}
        </span>
        <div className="flex items-center gap-1">
          <RowAction label="View" onClick={() => {}}>
            <Eye size={16} />
          </RowAction>
          <RowAction label="Edit" onClick={() => {}}>
            <Pencil size={16} />
          </RowAction>
          <DeleteTestButton test={test} onDeleted={onDeleted} />
        </div>
      </div>
    </div>
  )
}

export default TRowMob

type RowActionProps = {
  label: string
  onClick: () => void
  variant?: "default" | "danger"
  children: React.ReactNode
}

const RowAction = ({
  label,
  onClick,
  variant = "default",
  children,
}: RowActionProps) => {
  const colors =
    variant === "danger"
      ? "text-[#e5646d] hover:bg-[#fdECEE]"
      : "text-[#6a7899] hover:bg-[#eef3ff] hover:text-[#4f6fff]"
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${colors}`}
    >
      {children}
    </button>
  )
}
