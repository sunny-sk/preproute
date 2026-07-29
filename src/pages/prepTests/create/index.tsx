import TestForm from "@/components/test-form"
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
        navigate(`/test/${testId}/questions`)
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

  // Persist the test as a draft and return to the dashboard instead of
  // continuing to the questions step.
  const onSaveDraft = async (values: CreateTest) => {
    try {
      const payload = buildTestPayload({ ...values, status: "draft" })

      const response = await createTestApi(payload)
      if (response.status === "success") {
        toast.add({
          title: "Draft saved",
          description: response.message,
        })
        navigate("/test/dashboard")
      } else {
        toast.add({
          title: "Failed to save draft",
          description: response.message,
        })
      }
    } catch (error) {
      toast.add({
        title: "Failed to save draft",
        description: getApiErrorMessage(error),
      })
    }
  }

  return (
    <TestForm
      onSubmit={onSubmit}
      onSaveDraft={onSaveDraft}
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
