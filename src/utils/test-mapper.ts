import type { QuestionDraft } from "@/pages/prepTests/questions/components/question"
import type { BulkQuestionPayload, Test } from "@/types"
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
 * Maps the local question drafts into the `POST /questions/bulk` payload.
 *
 * Drafts hold topic / sub-topic *ids*, but the API expects their *names* as a
 * single string, so pass the id -> name lookups (see `getTopicNameMaps`).
 */
export const buildBulkQuestionsPayload = (
  questions: QuestionDraft[],
  testId: string,
  subjectId: string,
  topicNames: Record<string, string> = {},
  subTopicNames: Record<string, string> = {}
): BulkQuestionPayload[] => {
  return questions.map((q) => {
    const temp: BulkQuestionPayload = {
      type: "mcq",
      question: q.question,
      option1: q.option1,
      option2: q.option2,
      option3: q.option3,
      option4: q.option4,
      correct_option: q.correct_option,
      test_id: testId,
      subject: subjectId,
    }
    if (q.explanation) {
      temp.explanation = q.explanation
    }
    if (q.difficulty) {
      temp.difficulty = q.difficulty
    }
    if (q.media_url) {
      temp.media_url = q.media_url
    }
    const topic = q.topic ? (topicNames[q.topic] ?? q.topic) : ""
    if (topic) {
      temp.topic = topic
    }
    const subTopic = q.sub_topic
      ? (subTopicNames[q.sub_topic] ?? q.sub_topic)
      : ""
    if (subTopic) {
      temp.sub_topic = subTopic
    }
    return temp
  })
}

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

export const transformTestResponse = (test: Test) => {
  if (!test.id) return null
  return {
    id: test.id,
    name: test.name,
    type: test.type,
    subject: test.subject,
    topics: test.topics,
    subTopics: test.sub_topics,
    questions: test.questions,
    correctMarks: test.correct_marks,
    unattemptMarks: test.unattempt_marks,
    wrongMarks: test.wrong_marks,
    difficulty: test.difficulty,
    totalMarks: test.total_marks,
    totalTime: test.total_time,
    totalQuestions: test.total_questions,
    slot: test.slot,
    hiddenFromModerator: test.hidden_from_moderator,
    createdBy: test.created_by,
    createdAt: test.created_at,
    updatedBy: test.updated_by,
    updatedAt: test.updated_at,
    paragraphQuestion: test.paragraph_question,
    status: test.status,
    scheduledDate: test.scheduled_date,
    expiryDate: test.expiry_date,
  }
}
