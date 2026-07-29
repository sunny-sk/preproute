import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { bulkCreateQuestionsApi, publishTestApi } from '@/services/tests'
import useLoadedTest from '@/store/useLoadedTest'
import { getApiErrorMessage } from '@/utils/helper'
import { buildBulkQuestionsPayload } from '@/utils/test-mapper'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useShallow } from 'zustand/react/shallow'

interface PublishBtnProps {
  id: string | undefined
  subjectId: string | null
}

const PublishBtn = ({ id, subjectId }: PublishBtnProps) => {
  const { questions, resetTest } = useLoadedTest(useShallow((s) => {
    return {
      questions: s.questions,
      resetTest: s.resetTest,
    }
  }));
  const navigate = useNavigate();

  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    if (!id || isPublishing) return
    if (!subjectId) {
      toast.add({
        title: "Failed to publish test",
        description: "Subject ID is required",
      })
      return
    }
    const isNotCompleted = questions.some((question) => question.status !== "completed");
    if (isNotCompleted) {
      toast.add({
        title: "Please complete all questions before publishing",
        description: "You have not completed all questions",
      })
      return;
    }

    setIsPublishing(true)
    try {

      const payload = buildBulkQuestionsPayload(questions, id, subjectId)
      const createRes = await bulkCreateQuestionsApi(payload)
      if (createRes.status !== "success") {
        toast.add({
          title: "Failed to save questions",
          description: createRes.message,
        })
        return
      }

      // Attach the created questions to the test and publish it.
      const questionIds = createRes.data.map((question) => question.id)
      const publishRes = await publishTestApi(id, questionIds)
      if (publishRes.status !== "success") {
        toast.add({
          title: "Failed to publish test",
          description: publishRes.message,
        })
        return
      }

      toast.add({
        title: "Test published",
        description: publishRes.message || "Your test is now live",
      })

      // clear the local draft and head back to the dashboard.
      resetTest()
      navigate("/test/dashboard")
    } catch (error) {
      toast.add({
        title: "Failed to publish test",
        description: getApiErrorMessage(error, "Failed to publish test"),
      })
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <Button
      type="button"
      onClick={handlePublish}
      disabled={isPublishing}
      className="h-11 rounded-lg px-8 text-sm font-medium cursor-pointer"
    >
      {isPublishing ? (
        <>
          <Loader2Icon className="animate-spin" aria-hidden="true" />
          Publishing…
        </>
      ) : (
        "Publish"
      )}
    </Button>
  )
};

export default PublishBtn;