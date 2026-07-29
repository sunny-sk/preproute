import type { TestStatus } from "@/types"

export const DIFFICULTY_LEVELS = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "difficult", label: "Difficult" },
]

/** Presentation metadata for each status (label + badge colors). */
export const TEST_STATUS_META: Record<
  TestStatus,
  { label: string; className: string; dotClassName: string }
> = {
  published: {
    label: "Published",
    className: "bg-success-soft text-success-strong",
    dotClassName: "bg-success",
  },
  draft: {
    label: "Draft",
    className: "bg-warning-soft text-warning-strong",
    dotClassName: "bg-warning",
  },
  live: {
    label: "Live",
    className: "bg-brand-soft text-brand",
    dotClassName: "bg-brand",
  },
  expired: {
    label: "Expired",
    className: "bg-danger-soft text-danger-strong",
    dotClassName: "bg-danger",
  },
  archived: {
    label: "Archived",
    className: "bg-surface-muted text-body-subtle",
    dotClassName: "bg-placeholder",
  },
  unpublished: {
    label: "Unpublished",
    className: "bg-surface-muted text-body-subtle",
    dotClassName: "bg-placeholder",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-violet-soft text-violet",
    dotClassName: "bg-violet",
  },
  "no-status": {
    label: "N/A",
    className: "bg-surface-muted text-body-subtle",
    dotClassName: "bg-placeholder",
  },
}

export const TEST_STATUS_OPTIONS = (
  Object.keys(TEST_STATUS_META) as TestStatus[]
).map((value) => ({ value, label: TEST_STATUS_META[value].label }))
