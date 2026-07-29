import { Badge } from "@/components/ui/badge"
import useLoadedTest from "@/store/useLoadedTest"
import { TestType, type TestDifficulty, type TransformedTest } from "@/types"
import {
  Download,
  Pencil,
  Plus,
} from "lucide-react"
import { Link } from "react-router"
import { useShallow } from "zustand/react/shallow"

const TEST_TYPE_LABELS: Record<TestType, string> = {
  [TestType.CHAPTERWISE]: "Chapter Wise",
  [TestType.PYQ]: "PYQ",
  [TestType.MOCK]: "Mock Test",
}

const DIFFICULTY_META: Record<
  TestDifficulty,
  { label: string; className: string }
> = {
  easy: { label: "Easy", className: "bg-success text-white" },
  medium: { label: "Medium", className: "bg-warning text-white" },
  difficult: { label: "Difficult", className: "bg-danger text-white" },
}

interface TestPreviewHeaderProps {
  /** 1-based index of the question currently being worked on. */
  currentQuestion?: number
  onAddMcq?: () => void
  onImportCsv?: () => void
  /** Render this test instead of the draft in the store (used by the preview screen). */
  test?: TransformedTest
  /** Hide the edit link and question toolbar for a read-only preview. */
  readOnly?: boolean
}

const TestPreviewHeader = ({
  onAddMcq,
  onImportCsv,
  test,
  readOnly = false,
}: TestPreviewHeaderProps) => {
  const { loadedTest: storeTest, testId, selectedQuestion } = useLoadedTest(useShallow((s) => {
    return {
      loadedTest: s.loadedTest,
      testId: s.testId,
      selectedQuestion: s.selectedQuestion,
    }
  }));

  const loadedTest = test ?? storeTest

  if (!loadedTest) return null

  const difficulty = DIFFICULTY_META[loadedTest.difficulty]

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,68,0.04)]">
        {/* Type + edit */}
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-heading px-4 py-1.5 text-xs font-semibold text-white">
            {TEST_TYPE_LABELS[loadedTest.type]}
          </span>
          {!readOnly && testId ? (
            <Link
              to={`/test/${testId}/edit`}
              aria-label="Edit test"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-brand transition-colors hover:bg-brand-soft"
            >
              <Pencil size={18} />
            </Link>
          ) : null}
        </div>

        {/* Name + difficulty */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <img src="/ar_stickers.svg" />
          <h2 className="text-lg font-bold text-heading">
            {loadedTest.name}
          </h2>
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium ${difficulty.className}`}
          >
            <img src="/cognition.svg" />
            {loadedTest.difficulty}
          </span>
        </div>

        {/* Details + stats */}
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <DetailRow label="Subject">
              <span className="text-sm text-body">
                {loadedTest.subject || "—"}
              </span>
            </DetailRow>

            <DetailRow label="Topic">
              <div className="flex flex-wrap gap-2">
                {loadedTest.topics.map((name) => (
                  <Badge key={name} variant="outline" className="border-warning-border rounded-md text-warning-strong">{name}</Badge>
                ))}
              </div>
            </DetailRow>

            <DetailRow label="Sub Topic">
              <div className="flex flex-wrap gap-2">
                {loadedTest.subTopics.map((name) => (
                  <Badge key={name} variant="outline" className="border-warning-border rounded-md text-warning-strong">{name}</Badge>
                ))}
              </div>
            </DetailRow>
          </div>

          {/* Stats */}
          <div className="flex w-fit items-center gap-4 rounded-xl border border-line px-5 py-2.5">
            <Stat icon={<img src="/timer.svg" />} value={`${loadedTest.totalTime} Min`} />
            <span className="h-5 w-px bg-line" />
            <Stat
              icon={<img src="/quiz.svg" />}
              value={`${loadedTest.totalQuestions} Q's`}
            />
            <span className="h-5 w-px bg-line" />
            <Stat icon={<img src="/leaderboard.png" />} value={`${loadedTest.totalMarks} Marks`} />
          </div>
        </div>
      </div>

      {/* Question toolbar */}
      {!readOnly ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-lg font-semibold text-heading">
            Question {selectedQuestion?.id}
            <span className="text-brand-muted">/{loadedTest.totalQuestions}</span>
          </p>

          <div className="flex items-center gap-3">
            <ToolbarButton icon={<Plus size={16} />} onClick={onAddMcq}>
              MCQ
            </ToolbarButton>
            <ToolbarButton icon={<Download size={16} />} onClick={onImportCsv}>
              CSV
            </ToolbarButton>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default TestPreviewHeader

function DetailRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="w-20 shrink-0 text-sm text-placeholder">{label}</span>
      <span className="text-sm text-placeholder">:</span>
      <div className="pt-px">{children}</div>
    </div>
  )
}


function Stat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="flex items-center gap-2 text-sm font-medium text-body">
      {icon}
      {value}
    </span>
  )
}

function ToolbarButton({
  icon,
  onClick,
  children,
}: {
  icon: React.ReactNode
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-surface-muted px-5 py-2.5 text-sm font-medium text-body-subtle transition-colors hover:bg-line-strong"
    >
      {icon}
      {children}
    </button>
  )
}
