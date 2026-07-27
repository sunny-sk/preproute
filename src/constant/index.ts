
export const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"]
export const TOPICS = ["Mechanics", "Thermodynamics", "Optics", "Electromagnetism"]
export const SUB_TOPICS = ["Kinematics", "Newton's Laws", "Work & Energy", "Rotational Motion"]

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

export const TEST_STATUS_OPTIONS = (Object.keys(TEST_STATUS_META) as TestStatus[]).map(
  (value) => ({ value, label: TEST_STATUS_META[value].label })
)

/** Demo data — stands in for `getAllTestsApi()` until the backend is wired up. */
export const DEMO_TESTS: Test[] = [
  {
    id: "tst-1024",
    name: "Kinematics Foundation Test",
    subject: "Physics",
    status: "published",
    createdAt: "2026-07-18",
    questions: 30,
    duration: 45,
  },
  {
    id: "tst-1025",
    name: "Organic Chemistry — Nomenclature",
    subject: "Chemistry",
    status: "draft",
    createdAt: "2026-07-21",
    questions: 25,
    duration: 40,
  },
  {
    id: "tst-1026",
    name: "Calculus: Limits & Continuity",
    subject: "Mathematics",
    status: "scheduled",
    createdAt: "2026-07-24",
    questions: 40,
    duration: 60,
  },
  {
    id: "tst-1027",
    name: "Cell Biology Rapid Quiz",
    subject: "Biology",
    status: "published",
    createdAt: "2026-07-12",
    questions: 20,
    duration: 30,
  },
  {
    id: "tst-1028",
    name: "Thermodynamics Mock Test",
    subject: "Physics",
    status: "archived",
    createdAt: "2026-06-29",
    questions: 50,
    duration: 90,
  },
  {
    id: "tst-1029",
    name: "Chemical Bonding Practice Set",
    subject: "Chemistry",
    status: "published",
    createdAt: "2026-07-25",
    questions: 35,
    duration: 50,
  },
  {
    id: "tst-1030",
    name: "Trigonometry Full Syllabus",
    subject: "Mathematics",
    status: "draft",
    createdAt: "2026-07-08",
    questions: 45,
    duration: 75,
  },
  {
    id: "tst-1031",
    name: "Human Physiology Final",
    subject: "Biology",
    status: "scheduled",
    createdAt: "2026-07-26",
    questions: 60,
    duration: 120,
  },
]