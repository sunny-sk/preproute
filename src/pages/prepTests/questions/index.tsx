import Breadcrum from "@/components/breadcrum"
import { getSubjectsApi, getTestByIdApi } from "@/services/tests"
import useLoadedTest from "@/store/useLoadedTest"
import type { TransformedTest } from "@/types"
import { getApiErrorMessage } from "@/utils/helper"
import { transformTestResponse } from "@/utils/test-mapper"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import Empty from "./components/empty"
import PublishBtn from "./components/publish-btn"
import QuestionEditor from "./components/question-editor"
import TaskPreviewHeader from "./components/test-preview-header"

const TaskQuestions = () => {
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const {
    setLoadedTest,
    initQuestions,
    questions,
    selectedIndex,
    setSelectedQuestion,
    selectQuestionAt,
    updateQuestionStatus,
  } = useLoadedTest()
  const [test, setTest] = useState<TransformedTest | null>(null)
  const [subjectId, setSubjectId] = useState<string | null>(null)
  const topRef = useRef<HTMLDivElement>(null)



  const handleSubmitQuestion = () => {
    // Mark question completed/incomplete
    updateQuestionStatus()

    if (selectedIndex < questions.length - 1) {
      selectQuestionAt(selectedIndex + 1)
    }
    // back to top
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }



  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return

      setIsLoading(true)
      setError(null)
      try {
        const testResponse = await getTestByIdApi(id);
        if (testResponse.status !== "success") {
          setError("Failed to load test")
          return;
        }
        const transformedTest = transformTestResponse(testResponse.data)
        if (!transformedTest?.id) {
          setError(testResponse.message)
          return;
        }
        setTest(transformedTest)
        setLoadedTest(transformedTest)

        // Resolve the subject id so <Topic/> can fetch its topics.
        const subjectsRes = await getSubjectsApi()
        if (subjectsRes.status === "success") {
          setSubjectId(
            subjectsRes.data.find(
              (subject) => subject.name === transformedTest.subject
            )?.id ?? null
          )
        }

        // add empty questions
        initQuestions(id, transformedTest.totalQuestions)


      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load test"))
      } finally {
        setIsLoading(false)
      }
    }
    fetchTest()
  }, [id])


  return <>
    <div ref={topRef} className="border-[#eef2fb] bg-white p-8">
      <div className="flex items-center justify-between">
        <Breadcrum items={[{ label: "Dashboard" }, { label: "Test List" }]} />
        <PublishBtn id={id} subjectId={subjectId} />
      </div>

      <Empty isLoading={isLoading} error={error} />

      <TaskPreviewHeader />


      {!isLoading && test && !error ? (
        <div className="mt-8 border-t border-[#eef2fb] pt-8">
          <QuestionEditor
            onChange={setSelectedQuestion}
            onSubmit={handleSubmitQuestion}
            subjectId={subjectId}
          />
        </div>
      ) : null}
    </div>
  </>
}

export default TaskQuestions
