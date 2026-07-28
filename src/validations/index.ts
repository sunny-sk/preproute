import { TestType, type TestDifficulty, type TestStatus } from "@/types"
import z from "zod"

export const loginSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export type LoginFormSchema = z.infer<typeof loginSchema>

const TEST_DIFFICULTY_VALUES = ["easy", "medium", "difficult"] as const
const TEST_STATUS_VALUES = [
  "published",
  "draft",
  "live",
  "archived",
  "expired",
  "no-status",
  "unpublished",
  "scheduled",
] as const

export const createTestValidationSchema = z.object({
  testName: z.string().min(1, { message: "Name of Test is required" }),
  type: z.nativeEnum(TestType),
  subjectId: z.string().min(1, { message: "Subject is required" }),
  topicId: z
    .array(z.string())
    .min(1, { message: "Please select at least one topic" }),
  subTopicId: z
    .array(z.string())
    .min(1, { message: "Please select at least one sub-topic" }),
  correctAnswer: z
    .number()
    .min(0, { message: "Correct marks must be 0 or more" }),
  wrongAnswer: z.number(),
  unattempted: z.number(),
  noOfQuestions: z
    .number({ message: "Please enter the number of questions" })
    .min(1, { message: "Please enter the number of questions" }),
  difficulty: z.enum(TEST_DIFFICULTY_VALUES),
  duration: z
    .number({ message: "Please enter the duration" })
    .min(1, { message: "Please enter a duration" }),
  status: z.enum(TEST_STATUS_VALUES).nullable(),
})

export type CreateTest = z.infer<typeof createTestValidationSchema>

export type CreateTestPayload = {
  name: string
  type: TestType
  subject: string
  topics: string[]
  sub_topics: string[]
  correct_marks: number
  wrong_marks: number
  unattempt_marks: number
  difficulty: TestDifficulty
  total_questions: number
  total_time: number
  total_marks: number
  status: TestStatus | null
}
