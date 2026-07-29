import TaskForm from "@/components/task-form"
import { toast } from "@/components/ui/toast"
import { createTestApi } from "@/services/tests"
import { TestType } from "@/types"
import { getApiErrorMessage } from "@/utils/helper"
import { buildTestPayload } from "@/utils/test-mapper"
import { type CreateTest } from "@/validations"
import { useNavigate } from "react-router"

const TaskCreate = () => {
  const navigate = useNavigate()

  const onSubmit = async (values: CreateTest) => {
    try {
      const payload = buildTestPayload(values)

      const response = await createTestApi(payload)
      if (response.status === "success") {
        toast.add({
          title: "Test created successfully",
          description: response.message,
        })
        const testId = response.data.id
        navigate(`/task/create/${testId}/questions`)
      } else {
        toast.add({
          title: "Failed to create test",
          description: response.message,
        })
      }
    } catch (error) {
      toast.add({
        title: "Failed to create test",
        description: getApiErrorMessage(error),
      })
    }
  }

  return (
    <TaskForm
      onSubmit={onSubmit}
      formType="create"
      defaultValues={{
        type: TestType.CHAPTERWISE,
        testName: "",
        subjectId: "",
        topicId: [],
        subTopicId: [],
        duration: 0,
        difficulty: "easy",
        wrongAnswer: -1,
        unattempted: 0,
        correctAnswer: 5,
        noOfQuestions: 0,
        status: "draft",
      }}
    />
  )
}

export default TaskCreate
