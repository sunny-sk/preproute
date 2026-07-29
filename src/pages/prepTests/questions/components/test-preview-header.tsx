import { Badge } from "@/components/ui/badge"
import useLoadedTest from "@/store/useLoadedTest"
import { TestType, type TestDifficulty } from "@/types"
import {
  Download,
  Pencil,
  Plus,
} from "lucide-react"
import { Link } from "react-router"

const TEST_TYPE_LABELS: Record<TestType, string> = {
  [TestType.CHAPTERWISE]: "Chapter Wise",
  [TestType.PYQ]: "PYQ",
  [TestType.MOCK]: "Mock Test",
}

const DIFFICULTY_META: Record<
  TestDifficulty,
  { label: string; className: string }
> = {
  easy: { label: "Easy", className: "bg-[#57b5a6] text-white" },
  medium: { label: "Medium", className: "bg-[#f0a92c] text-white" },
  difficult: { label: "Difficult", className: "bg-[#e5646d] text-white" },
}

interface TestPreviewHeaderProps {
  /** 1-based index of the question currently being worked on. */
  currentQuestion?: number
  onAddMcq?: () => void
  onImportCsv?: () => void
}

const TestPreviewHeader = ({
  onAddMcq,
  onImportCsv,
}: TestPreviewHeaderProps) => {
  const { loadedTest, testId, selectedQuestion } = useLoadedTest();

  if (!loadedTest) return null

  const difficulty = DIFFICULTY_META[loadedTest.difficulty]

  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-2xl border border-[#eef2fb] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,68,0.04)]">
        {/* Type + edit */}
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-[#101a44] px-4 py-1.5 text-xs font-semibold text-white">
            {TEST_TYPE_LABELS[loadedTest.type]}
          </span>
          {testId ? (
            <Link
              to={`/test/${testId}/edit`}
              aria-label="Edit test"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#4f6fff] transition-colors hover:bg-[#eef3ff]"
            >
              <Pencil size={18} />
            </Link>
          ) : null}
        </div>

        {/* Name + difficulty */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <img src="/ar_stickers.svg" />
          <h2 className="text-lg font-bold text-[#1f2a44]">
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
              <span className="text-sm text-[#33415c]">
                {loadedTest.subject || "—"}
              </span>
            </DetailRow>

            <DetailRow label="Topic">
              <div className="flex flex-wrap gap-2">
                {loadedTest.topics.map((name) => (
                  <Badge key={name} variant="outline" className="border-[#f3d283] rounded-md text-[#d99e1f]">{name}</Badge>
                ))}
              </div>
            </DetailRow>

            <DetailRow label="Sub Topic">
              <div className="flex flex-wrap gap-2">
                {loadedTest.subTopics.map((name) => (
                  <Badge key={name} variant="outline" className="border-[#f3d283] rounded-md text-[#d99e1f]">{name}</Badge>
                ))}
              </div>
            </DetailRow>
          </div>

          {/* Stats */}
          <div className="flex w-fit items-center gap-4 rounded-xl border border-[#eef1f8] px-5 py-2.5">
            <Stat icon={<img src="/timer.svg" />} value={`${loadedTest.totalTime} Min`} />
            <span className="h-5 w-px bg-[#e8ecf5]" />
            <Stat
              icon={<img src="/quiz.svg" />}
              value={`${loadedTest.totalQuestions} Q's`}
            />
            <span className="h-5 w-px bg-[#e8ecf5]" />
            <Stat icon={<img src="/leaderboard.png" />} value={`${loadedTest.totalMarks} Marks`} />
          </div>
        </div>
      </div>

      {/* Question toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-lg font-semibold text-[#1f2a44]">
          Question {selectedQuestion?.id}
          <span className="text-[#9db2ff]">/{loadedTest.totalQuestions}</span>
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
      <span className="w-20 shrink-0 text-sm text-[#8b96ad]">{label}</span>
      <span className="text-sm text-[#8b96ad]">:</span>
      <div className="pt-px">{children}</div>
    </div>
  )
}


function Stat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="flex items-center gap-2 text-sm font-medium text-[#2f3b52]">
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
      className="flex items-center gap-2 rounded-lg bg-[#f1f3fc] px-5 py-2.5 text-sm font-medium text-[#7581a0] transition-colors hover:bg-[#e8ecf9]"
    >
      {icon}
      {children}
    </button>
  )
}
