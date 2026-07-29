import TestForm from "@/components/test-form"
import Seo from "@/components/seo"
import { toast } from "@/components/ui/toast"
import { getTestForEditApi, updateTestById } from "@/services/tests"
import { getApiErrorMessage } from "@/utils/helper"
import { buildTestPayload } from "@/utils/test-mapper"
import { type CreateTest } from "@/validations"
import { Loader2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

const TestEdit = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [test, setTest] = useState<CreateTest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (values: CreateTest) => {
    if (!id) return
    try {
      const payload = buildTestPayload(values)
      const response = await updateTestById(id, payload)
      if (response.status === "success") {
        toast.add({
          title: "Test updated successfully",
          description: response.message,
        })
        navigate("/test/dashboard")
      } else {
        toast.add({
          title: "Failed to update test",
          description: response.message,
        })
      }
    } catch (err) {
      toast.add({
        title: "Failed to update test",
        description: getApiErrorMessage(err),
      })
    }
  }

  useEffect(() => {
    const fetchTest = async () => {
      if (!id) return
      setIsLoading(true)
      setError(null)
      try {
        const formValues = await getTestForEditApi(id)
        setTest(formValues)
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load test"))
      } finally {
        setIsLoading(false)
      }
    }
    fetchTest()
  }, [id])

  if (isLoading) {
    return (
      <>
        <Seo
          title="Edit Test | Preproute"
          description="Update test details, topics, and scoring configuration."
          path={id ? `/test/${id}/edit` : "/test/edit"}
        />
        <div className="flex items-center justify-center gap-2 bg-white p-16 text-sm text-body-subtle">
          <Loader2Icon className="animate-spin" aria-hidden="true" />
          Loading test…
        </div>
      </>
    )
  }

  if (error || !test) {
    return (
      <>
        <Seo
          title="Edit Test | Preproute"
          description="Update test details, topics, and scoring configuration."
          path={id ? `/test/${id}/edit` : "/test/edit"}
          noIndex
        />
        <div className="flex flex-col items-center justify-center gap-3 bg-white p-16 text-center">
          <p className="text-sm text-destructive">{error ?? "Test not found"}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Seo
        title={`Edit ${test.testName} | Preproute`}
        description="Update test details, topics, and scoring configuration."
        path={id ? `/test/${id}/edit` : "/test/edit"}
      />
      <TestForm defaultValues={test} onSubmit={onSubmit} formType="edit" />
    </>
  )
}

export default TestEdit
