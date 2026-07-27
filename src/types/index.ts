export type ApiStatus = "success" | "error"

/** Shared envelope for all API responses. `T` is the shape of `data`. */
export type ApiResponse<T> = {
  status: ApiStatus
  message: string
  data: T
}

export type UserResponse = ApiResponse<{
  user: {
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
export type TestType = "chapterwise" | "pyq" | "mock"
export type TestDifficulty = "easy" | "medium" | "difficult"
export type TestStatus = "draft" | "published" | "scheduled" | "archived"

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

export type TestResponse = ApiResponse<Test[]>
