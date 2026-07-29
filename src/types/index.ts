export type ApiStatus = "success" | "error"

export type TestStatus =
  | "published"
  | "draft"
  | "live"
  | "archived"
  | "expired"
  | "no-status"
  | "unpublished"
  | "scheduled"

/** Shared envelope for all API responses. `T` is the shape of `data`. */
export type ApiResponse<T> = {
  status: ApiStatus
  message: string
  data: T
}

export const TestType = {
  CHAPTERWISE: "chapterwise",
  PYQ: "pyq",
  MOCK: "mock",
} as const

export type TestType = (typeof TestType)[keyof typeof TestType]

export type User = {
  endDate: string
  id: string
  joiningDate: string
  lastActive: string
  name: string
  payment: boolean
  phone: string
  role: "admin" | "moderator" | "user"
  subrole: string
  userId: string
}
export type UserResponse = ApiResponse<{
  user: User
  token: string
}>

export type SubjectResponse = ApiResponse<
  {
    id: string
    name: string
    created_at: string
    updated_at: string
  }[]
>
export type TopicResponse = ApiResponse<
  {
    id: string
    name: string
    subject_id: string
  }[]
>
export type SubTopicResponse = ApiResponse<
  {
    id: string
    name: string
    topic_id: string
  }[]
>
export type TestDifficulty = "easy" | "medium" | "difficult"

export type Test = {
  id: string
  name: string
  type: TestType
  subject: string
  topics: string[]
  sub_topics: string[]
  questions: unknown[] | null
  correct_marks: number
  unattempt_marks: number
  wrong_marks: number
  difficulty: TestDifficulty
  total_marks: number
  total_time: number // minutes
  total_questions: number
  slot: string | null
  hidden_from_moderator: boolean | null
  created_by: number
  created_at: string
  updated_by: number
  updated_at: string
  paragraph_question: string | null
  status: TestStatus
  scheduled_date: string | null
  expiry_date: string | null
}

export type TestResponse = ApiResponse<Test>
export type TestsResponse = ApiResponse<Test[]>

/** A single question in the `POST /questions/bulk` request body. */
export type BulkQuestionPayload = {
  type: "mcq"
  question: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct_option: string
  explanation?: string
  difficulty?: TestDifficulty
  test_id: string
  subject: string
}

/** A question echoed back by the bulk-create endpoint (id plus stored fields). */
export type CreatedQuestion = { id: string } & Record<string, unknown>

export type BulkQuestionsResponse = ApiResponse<CreatedQuestion[]>

/** A stored question as returned by `POST /questions/fetchBulk`. */
export type Question = {
  id: string
  type: string
  question: string
  option1: string
  option2: string
  option3: string
  option4: string
  correct_option: string
  explanation?: string
  difficulty?: TestDifficulty
  test_id?: string
  subject?: string
  media_url?: string
}

export type FetchBulkQuestionsResponse = ApiResponse<Question[]>


export type TransformedTest = {
  id: string
  name: string
  type: TestType
  subject: string
  topics: string[]
  subTopics: string[]
  questions: unknown[] | null
  correctMarks: number
  unattemptMarks: number
  wrongMarks: number
  difficulty: TestDifficulty
  totalMarks: number
  totalTime: number // minutes
  totalQuestions: number
  slot: string | null
  hiddenFromModerator: boolean | null
  createdBy: number
  createdAt: string
  updatedBy: number
  updatedAt: string
  paragraphQuestion: string | null
  status: TestStatus
  scheduledDate: string | null
  expiryDate: string | null
}