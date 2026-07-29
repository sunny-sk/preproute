import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import Breadcrum from "@/components/breadcrum"
import { Button } from "@/components/ui/button"
import { getAllTestsApi } from "@/services/tests"
import type { Test } from "@/types"
import EmptyState from "./components/empty"
import THead from "./components/t-head"
import TRow from "./components/t-row"
import TRowMob from "./components/t-row-mob"
import TRowSkeleton from "./components/t-row-skeleton"
import TRowMobSkeleton from "./components/t-row-mob-skeleton"

const TaskDashboard = () => {
  const navigate = useNavigate()

  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(false)

  const handleCreate = () => navigate("/test/create")

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

  return (
    <div className="border-[#eef2fb] bg-white p-8">
      <Breadcrum items={[{ label: "Dashboard" }, { label: "Test List" }]} />

      {/* Page heading */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#24324b]">Test List</h1>
          <p className="mt-1 text-sm text-[#68758f]">
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

      {/* Table (md and up) */}
      <div className="mt-6 hidden overflow-hidden rounded-xl border border-[#eef2fb] bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <THead />
            <tbody className="divide-y divide-[#f1f4fb]">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TRowSkeleton key={i} />
                  ))
                : tests.map((test) => <TRow key={test.id} test={test} />)}
            </tbody>
          </table>
        </div>

        {/* {tests.length === 0 ? <EmptyState onCreate={handleCreate} /> : null} */}
      </div>

      {/* Cards (small screens) */}
      <div className="mt-6 space-y-3 md:hidden">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <TRowMobSkeleton key={i} />)
          : tests.map((test) => <TRowMob key={test.id} test={test} />)}

        {!loading && tests.length === 0 ? (
          <div className="rounded-xl border border-[#eef2fb] bg-white">
            <EmptyState />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TaskDashboard
