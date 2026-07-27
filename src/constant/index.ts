export const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"]
export const TOPICS = [
  "Mechanics",
  "Thermodynamics",
  "Optics",
  "Electromagnetism",
]
export const SUB_TOPICS = [
  "Kinematics",
  "Newton's Laws",
  "Work & Energy",
  "Rotational Motion",
]

export const DIFFICULTY_LEVELS = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "difficult", label: "Difficult" },
]

export type TestStatus = "published" | "draft" | "scheduled" | "archived"

export type Test = {
  id: string
  name: string
  subject: string
  status: TestStatus
  createdAt: string // ISO date string
  questions: number
  duration: number // minutes
}

/** Presentation metadata for each status (label + badge colors). */
export const TEST_STATUS_META: Record<
  TestStatus,
  { label: string; className: string; dotClassName: string }
> = {
  published: {
    label: "Published",
    className: "bg-[#e7f8f0] text-[#12a06a]",
    dotClassName: "bg-[#16c47f]",
  },
  draft: {
    label: "Draft",
    className: "bg-[#fff4e5] text-[#c8871f]",
    dotClassName: "bg-[#f0a92c]",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-[#eaf0ff] text-[#4f6fff]",
    dotClassName: "bg-[#4f6fff]",
  },
  archived: {
    label: "Archived",
    className: "bg-[#f1f3f8] text-[#7581a0]",
    dotClassName: "bg-[#9aa6be]",
  },
}

export const TEST_STATUS_OPTIONS = (
  Object.keys(TEST_STATUS_META) as TestStatus[]
).map((value) => ({ value, label: TEST_STATUS_META[value].label }))
