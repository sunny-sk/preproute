import { Eye, Pencil } from "lucide-react"
import { memo } from "react"
import StatusBadge from "./status-badge"
import DeleteTestButton from "./delete-test-button"
import type { Test } from "@/types"
import { formatDate } from "@/utils/helper"
import { Link } from "react-router"
import { ROW_GRID } from "./columns"

type TRowProps = {
  test: Test
  onDeleted: (id: string) => void
  // react-window passes `style` (absolute position + row height) and a set of
  // aria attributes, spread onto the row root via `...rest`.
} & React.HTMLAttributes<HTMLDivElement>

const TRow = ({ test, onDeleted, className = "", ...rest }: TRowProps) => {
  const isPublished = ["scheduled", "published", "live"].includes(
    test.status ?? ""
  )
  return (
    <div
      {...rest}
      className={`${ROW_GRID} h-full border-b border-line px-3 text-left transition-colors hover:bg-canvas ${className}`}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-body">{test.name}</p>
        <p className="mt-0.5 truncate text-xs text-placeholder">
          {test.questions?.length} Questions · {test.total_time} min
        </p>
      </div>
      <div className="min-w-0 truncate text-sm text-body-muted">
        {test.subject}
      </div>
      <div>
        <StatusBadge status={test.status} />
      </div>
      <div className="text-sm text-body-muted">
        {formatDate(test.created_at)}
      </div>
      <div className="flex items-center justify-end gap-1">
        <Link
          to={
            isPublished
              ? `/test/${test.id}/preview`
              : `/test/${test.id}/edit`
          }
        >
          <RowAction label="View" onClick={() => {}}>
            <Eye size={16} />
          </RowAction>
        </Link>
        <Link to={`/test/${test.id}/edit`}>
          <Pencil size={16} />
        </Link>
        <DeleteTestButton test={test} onDeleted={onDeleted} />
      </div>
    </div>
  )
}

export default memo(TRow)

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
