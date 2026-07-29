import type { Test } from "@/types"
import type { CreateTest, CreateTestPayload } from "@/validations"

export const calcTotalMarks = (noOfQuestions: number, correctAnswer: number) =>
  noOfQuestions ? Number(noOfQuestions) * Number(correctAnswer) : 0

/** form to payload mapper */
export const buildTestPayload = (values: CreateTest): CreateTestPayload => ({
  name: values.testName,
  type: values.type,
  subject: values.subjectId,
  topics: values.topicId,
  sub_topics: values.subTopicId,
  correct_marks: values.correctAnswer,
  wrong_marks: values.wrongAnswer,
  unattempt_marks: values.unattempted,
  difficulty: values.difficulty,
  total_time: values.duration,
  total_marks: calcTotalMarks(values.noOfQuestions, values.correctAnswer),
  total_questions: values.noOfQuestions,
  status: values.status,
})

/**
 * Maps a test returned by the API back into the shape the form works with.
 *
 * The `GET /tests/:id` returns `subject` / `topics` / `sub_topics` as
 * name not the id, but the form's require ids to work.
 */
export const mapTestToForm = (
  test: Test,
  references: { subjectId: string; topicId: string[]; subTopicId: string[] }
): CreateTest => ({
  testName: test.name,
  type: test.type,
  subjectId: references.subjectId,
  topicId: references.topicId,
  subTopicId: references.subTopicId,
  correctAnswer: test.correct_marks,
  wrongAnswer: test.wrong_marks,
  unattempted: test.unattempt_marks,
  noOfQuestions: test.total_questions,
  difficulty: test.difficulty,
  duration: test.total_time,
  status: test.status,
})
