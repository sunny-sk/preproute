import Breadcrum from "@/components/breadcrum"
import Seo from "@/components/seo"
import { fetchBulkQuestionsApi, getTestByIdApi } from "@/services/tests"
import type { Question, TransformedTest } from "@/types"
import { getApiErrorMessage } from "@/utils/helper"
import { transformTestResponse } from "@/utils/test-mapper"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Empty from "../questions/components/empty"
import TaskPreviewHeader from "../questions/components/test-preview-header"
import QuestionView from "./components/question-view"

/**
 * `GET /tests/:id` returns `questions` as an array of ids (or, defensively,
 * objects carrying an `id`). Normalise either shape to a list of id strings.
 */
const toQuestionIds = (questions: unknown[] | null): string[] =>
  (questions ?? [])
    .map((q) =>
      typeof q === "string"
        ? q
        : q && typeof q === "object" && "id" in q
          ? String((q as { id: unknown }).id)
          : ""
    )
    .filter(Boolean)

const TestPreview = () => {
  const { id } = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [test, setTest] = useState<TransformedTest | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return

      setIsLoading(true)
      setError(null)
      try {
        const testResponse = await getTestByIdApi(id)
        if (testResponse.status !== "success") {
          setError("Failed to load test")
          return
        }
        const transformedTest = transformTestResponse(testResponse.data)
        if (!transformedTest?.id) {
          setError(testResponse.message)
          return
        }
        setTest(transformedTest)

        // Resolve the test's question ids into full question objects.
        const questionIds = toQuestionIds(transformedTest.questions)
        if (questionIds.length) {
          const questionsRes = await fetchBulkQuestionsApi(questionIds)
          if (questionsRes.status === "success") {
            setQuestions(questionsRes.data)
          }
        } else {
          setQuestions([])
        }
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load test"))
      } finally {
        setIsLoading(false)
      }
    }
    fetchTest()
  }, [id])

  return (
    <>
      <Seo
        title={test ? `${test.name} Preview | Preproute` : "Test Preview | Preproute"}
        description="Review test questions and structure before going live."
        path={id ? `/test/${id}/preview` : "/test/preview"}
      />
      <div className="border-line bg-white p-8">
        <Breadcrum
          items={[
            { label: "Dashboard", href: "/test/dashboard" },
            { label: "Preview" },
          ]}
        />

        <Empty isLoading={isLoading} error={error} />

        {!isLoading && test && !error ? (
          <>
            <TaskPreviewHeader test={test} readOnly />

            <div className="mt-8 space-y-6 border-t border-line pt-8">
              {questions.length ? (
                questions.map((question, i) => (
                  <QuestionView
                    key={question.id ?? i}
                    index={i + 1}
                    total={questions.length}
                    question={question}
                  />
                ))
              ) : (
                <p className="py-12 text-center text-sm text-body-subtle">
                  No questions to preview.
                </p>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default TestPreview
