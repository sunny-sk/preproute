import type { TestDifficulty } from "@/types"

export const OPTION_KEYS = ["option1", "option2", "option3", "option4"] as const

export type OptionKey = (typeof OPTION_KEYS)[number]

export type CorrectOption = OptionKey | ""

/** Whether a question has every field filled in. */
export type QuestionStatus = "incomplete" | "completed"

export type QuestionDraft = {
  /** 1-based question number, used as its stable identity. */
  id: number
  /** Filled-in state, recomputed when the user leaves the question. */
  status: QuestionStatus
  question: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct_option: CorrectOption
  explanation: string
  difficulty: TestDifficulty | ""
  topic: string
  sub_topic: string
  media_url: string
}

/** A blank question for slot `id`. */
export const createEmptyQuestion = (id: number): QuestionDraft => ({
  id,
  status: "incomplete",
  question: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correct_option: "",
  explanation: "",
  difficulty: "",
  topic: "",
  sub_topic: "",
  media_url: "",
})

/**
 * True when a rich-text (HTML) value has visible text and not just empty
 * markup — an untouched TipTap editor still emits "<p></p>".
 */
const hasRichText = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim().length > 0

/**
 * A question is "completed" once every field a moderator fills in the editor
 * has a value: the prompt, all four options, a chosen correct option, a
 * solution, a difficulty, at least one topic and a sub-topic. Adjust this list
 * if some of these fields should be optional.
 */
export const isQuestionComplete = (q: QuestionDraft): boolean =>
  hasRichText(q.question) &&
  q.option1.trim() !== "" &&
  q.option2.trim() !== "" &&
  q.option3.trim() !== "" &&
  q.option4.trim() !== "" &&
  q.correct_option !== ""

/** Completeness of `q` as its stored status value. */
export const getQuestionStatus = (q: QuestionDraft): QuestionStatus =>
  isQuestionComplete(q) ? "completed" : "incomplete"
