import { Eye, Pencil, Trash2 } from 'lucide-react'
import StatusBadge from './status-badge'
import type { Test } from '@/types'
import { formatDate } from '@/utils/helper'
import { Link } from 'react-router'

const TRow = ({ test }: { test: Test }) => {
  return (
    <tr key={test.id} className="transition-colors hover:bg-[#fafbff]">
      <td className="px-3 py-4">
        <p className="text-sm font-medium text-[#2f3b52]">{test.name}</p>
        <p className="mt-0.5 text-xs text-[#9aa6be]">
          {test.questions?.length} Questions · {test.total_time} min
        </p>
      </td>
      <td className="px-3 py-4 text-sm text-[#52607a]">{test.subject}</td>
      <td className="px-3 py-4">
        <StatusBadge status={test.status} />
      </td>
      <td className="px-3 py-4 text-sm text-[#52607a]">{formatDate(test.created_at)}</td>
      <td className="px-3 py-4">
        <div className="flex items-center justify-end gap-1">
          <RowAction label="View" onClick={() => {

          }}>
            <Eye size={16} />
          </RowAction>
          <Link to={`/task/${test.id}/edit`} >
            <Pencil size={16} />
          </Link>
          <RowAction label="Delete" variant="danger" onClick={() => {

          }}>
            <Trash2 size={16} />
          </RowAction>
        </div>
      </td>
    </tr>
  )
}

export default TRow


type RowActionProps = {
  label: string
  onClick: () => void
  variant?: "default" | "danger"
  children: React.ReactNode
}

const RowAction = ({ label, onClick, variant = "default", children }: RowActionProps) => {
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