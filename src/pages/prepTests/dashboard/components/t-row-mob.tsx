import { Eye, Pencil } from "lucide-react"
import { memo } from "react"
import StatusBadge from "./status-badge"
import DeleteTestButton from "./delete-test-button"
import type { Test } from "@/types"
import { formatDate } from "@/utils/helper"
import { Link } from "react-router"


type TRowMobProps = {
  test: Test
  onDeleted: (id: string) => void
}

const TRowMob = ({ test, onDeleted }: TRowMobProps) => {
  return (
    <div
      key={test.id}
      className="rounded-xl border border-line bg-white p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-body">{test.name}</p>
          <p className="mt-0.5 truncate text-xs text-placeholder">
            {test.subject} · {test.questions?.length} Questions ·{" "}
            {test.total_time} min
          </p>
        </div>
        <StatusBadge status={test.status} />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="text-xs text-placeholder">
          Created {formatDate(test.created_at)}
        </span>
        <div className="flex items-center gap-1">
          <Link to={`/test/${test.id}/questions`}>
            <RowAction label="View" onClick={() => { }}>
              <Eye size={16} />
            </RowAction>
          </Link>
          <RowAction label="Edit" onClick={() => { }}>
            <Pencil size={16} />
          </RowAction>
          <DeleteTestButton test={test} onDeleted={onDeleted} />
        </div>
      </div>
    </div>
  )
}

export default memo(TRowMob)

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
      ? "text-danger hover:bg-danger-soft"
      : "text-body-subtle hover:bg-brand-soft hover:text-brand"
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
