import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  OPTION_KEYS,
  type OptionKey,
} from "@/pages/prepTests/questions/components/question"
import type { TestDifficulty } from "@/types"

/**
 * A question as returned for a published test. It mirrors the bulk-create
 * payload; every field is optional so a partially-populated record still
 * renders without throwing.
 */
export type PreviewQuestion = {
  id?: string | number
  question?: string
  option1?: string
  option2?: string
  option3?: string
  option4?: string
  correct_option?: string
  explanation?: string
  difficulty?: TestDifficulty | ""
  media_url?: string
  topic?: string
  sub_topic?: string
}

const DIFFICULTY_META: Record<
  TestDifficulty,
  { label: string; className: string }
> = {
  easy: { label: "Easy", className: "bg-success text-white" },
  medium: { label: "Medium", className: "bg-warning text-white" },
  difficult: { label: "Difficult", className: "bg-danger text-white" },
}

/** Rich-text (TipTap HTML) rendering to match the editor's output styling. */
const proseClass =
  "text-sm leading-relaxed text-body [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-brand [&_a]:underline [&_mark]:rounded [&_mark]:bg-highlight [&_mark]:px-0.5"

type QuestionViewProps = {
  /** 1-based question number. */
  index: number
  total: number
  question: PreviewQuestion
}

const QuestionView = ({ index, total, question }: QuestionViewProps) => {
  const difficulty = question.difficulty
    ? DIFFICULTY_META[question.difficulty as TestDifficulty]
    : null

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,68,0.04)]">
      {/* Number + difficulty */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-lg font-semibold text-heading">
          Question {index}
          <span className="text-brand-muted">/{total}</span>
        </p>
        {difficulty ? (
          <span
            className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ${difficulty.className}`}
          >
            {difficulty.label}
          </span>
        ) : null}
      </div>

      {/* Question prompt */}
      {question.question ? (
        <div
          className={`mt-4 ${proseClass}`}
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      ) : (
        <p className="mt-4 text-sm text-placeholder">No question text</p>
      )}

      {/* Attached media */}
      {question.media_url ? (
        <img
          src={question.media_url}
          alt={`Media for question ${index}`}
          className="mt-4 max-h-72 rounded-xl border border-line object-contain"
          onError={(event) => {
            event.currentTarget.style.display = "none"
          }}
        />
      ) : null}

      {/* Options — the correct one is highlighted. */}
      <div className="mt-6 space-y-3">
        {OPTION_KEYS.map((key, i) => {
          const text = question[key as OptionKey] ?? ""
          const isCorrect = question.correct_option === key
          return (
            <div
              key={key}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
                isCorrect
                  ? "border-success bg-success-soft text-success-strong"
                  : "border-line text-body"
              }`}
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                  isCorrect
                    ? "border-success bg-success text-white"
                    : "border-line-strong text-body-subtle"
                }`}
              >
                {isCorrect ? (
                  <Check size={14} aria-label="Correct answer" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="flex-1">
                {text || <span className="text-placeholder">—</span>}
              </span>
            </div>
          )
        })}
      </div>

      {/* Solution */}
      {question.explanation ? (
        <div className="mt-6 rounded-xl border border-line bg-canvas p-4">
          <h4 className="mb-2 text-sm font-semibold text-heading">Solution</h4>
          <div
            className={proseClass}
            dangerouslySetInnerHTML={{ __html: question.explanation }}
          />
        </div>
      ) : null}

      {/* Topic / Sub-topic */}
      {question.topic || question.sub_topic ? (
        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:gap-10">
          <TagGroup label="Topic" value={question.topic} />
          <TagGroup label="Sub-topic" value={question.sub_topic} />
        </div>
      ) : null}
    </div>
  )
}

export default QuestionView

function TagGroup({ label, value }: { label: string; value?: string }) {
  const items = (value ?? "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
  if (!items.length) return null
  return (
    <div className="flex items-start gap-2">
      <span className="shrink-0 pt-1 text-xs font-medium text-placeholder">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {items.map((name) => (
          <Badge
            key={name}
            variant="outline"
            className="rounded-md border-warning-border text-warning-strong"
          >
            {name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
