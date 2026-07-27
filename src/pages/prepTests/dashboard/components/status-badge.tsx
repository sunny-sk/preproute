import { TEST_STATUS_META } from '@/constant'
import type { TestStatus } from '@/types'

const StatusBadge = ({ status }: { status: TestStatus | null }) => {
  const meta = status ? TEST_STATUS_META[status] : TEST_STATUS_META["no-status"]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName}`} />
      {meta.label}
    </span>
  )
}

export default StatusBadge