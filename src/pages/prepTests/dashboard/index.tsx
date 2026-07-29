import { Plus } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"

import Breadcrum from "@/components/breadcrum"
import { Button } from "@/components/ui/button"
import { TEST_STATUS_META } from "@/constant"
import { getAllTestsApi } from "@/services/tests"
import type { Test } from "@/types"
import EmptyState from "./components/empty"
import TFilters, { ALL_STATUSES } from "./components/t-filters"
import THead from "./components/t-head"
import TRow from "./components/t-row"
import TRowMob from "./components/t-row-mob"
import TRowSkeleton from "./components/t-row-skeleton"
import TRowMobSkeleton from "./components/t-row-mob-skeleton"

const statusLabel = (test: Test) =>
  TEST_STATUS_META[test.status ?? "no-status"].label

const TaskDashboard = () => {
  const navigate = useNavigate()

  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<string>(ALL_STATUSES)

  const handleCreate = () => navigate("/test/create")

  const handleDeleted = (id: string) =>
    setTests((prev) => prev.filter((test) => test.id !== id))

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const response = await getAllTestsApi()
      if (response.status === "success") {
        setTests(response.data)
      }
      setLoading(false)
    }
    init()
  }, [])

  // Distinct status labels present in the loaded tests, used as filter options.
  const statusOptions = useMemo(() => {
    const labels = new Set<string>()
    tests.forEach((test) => labels.add(statusLabel(test)))
    return Array.from(labels)
  }, [tests])

  const filteredTests = useMemo(() => {
    const query = search.trim().toLowerCase()
    return tests.filter((test) => {
      const matchesSearch =
        !query ||
        test.name.toLowerCase().includes(query) ||
        test.subject.toLowerCase().includes(query)
      const matchesStatus =
        status === ALL_STATUSES || statusLabel(test) === status
      return matchesSearch && matchesStatus
    })
  }, [tests, search, status])

  const hasFilters = search.trim() !== "" || status !== ALL_STATUSES
  const isEmpty = !loading && filteredTests.length === 0

  return (
    <div className="border-line bg-white p-8">
      <Breadcrum items={[{ label: "Dashboard" }, { label: "Test List" }]} />

      {/* Page heading */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-heading">Test List</h1>
          <p className="mt-1 text-sm text-body-subtle">
            Manage, review and track all the tests you have created.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleCreate}
          className="h-11 shrink-0 rounded-lg px-5 text-sm font-medium"
        >
          <Plus size={16} />
          Create New Test
        </Button>
      </div>

      {/* Filters */}
      <TFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        statusOptions={statusOptions}
      />

      {/* Table (md and up) */}
      <div className="mt-6 hidden overflow-hidden rounded-xl border border-line bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <THead />
            <tbody className="divide-y divide-line">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TRowSkeleton key={i} />
                  ))
                : filteredTests.map((test) => (
                    <TRow
                      key={test.id}
                      test={test}
                      onDeleted={handleDeleted}
                    />
                  ))}
            </tbody>
          </table>
        </div>

        {isEmpty ? (
          <EmptyState
            title={hasFilters ? "No matching tests" : "No tests yet"}
            description={
              hasFilters
                ? "Try adjusting your search or status filter."
                : "Create your first test to get started."
            }
          />
        ) : null}
      </div>

      {/* Cards (small screens) */}
      <div className="mt-6 space-y-3 md:hidden">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <TRowMobSkeleton key={i} />)
          : filteredTests.map((test) => (
              <TRowMob key={test.id} test={test} onDeleted={handleDeleted} />
            ))}

        {isEmpty ? (
          <div className="rounded-xl border border-line bg-white">
            <EmptyState
              title={hasFilters ? "No matching tests" : "No tests yet"}
              description={
                hasFilters
                  ? "Try adjusting your search or status filter."
                  : "Create your first test to get started."
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TaskDashboard
