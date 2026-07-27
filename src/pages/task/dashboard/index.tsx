import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import Breadcrum from "@/components/breadcrum"
import {
  DEMO_TESTS,
  SUBJECTS,
  TEST_STATUS_META,
  TEST_STATUS_OPTIONS,
  type Test,
  type TestStatus,
} from "@/constant"
import { formatDate } from "@/utils/helper"

const ALL = "all"

const StatusBadge = ({ status }: { status: TestStatus }) => {
  const meta = TEST_STATUS_META[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClassName}`} />
      {meta.label}
    </span>
  )
}

const TaskDashboard = () => {
  const navigate = useNavigate()

  const [tests, setTests] = useState<Test[]>(DEMO_TESTS)
  const [search, setSearch] = useState("")
  const [subject, setSubject] = useState<string>(ALL)
  const [status, setStatus] = useState<string>(ALL)

  const filteredTests = useMemo(() => {
    const query = search.trim().toLowerCase()
    return tests.filter((test) => {
      const matchesSearch =
        !query ||
        test.name.toLowerCase().includes(query) ||
        test.subject.toLowerCase().includes(query)
      const matchesSubject = subject === ALL || test.subject === subject
      const matchesStatus = status === ALL || test.status === status
      return matchesSearch && matchesSubject && matchesStatus
    })
  }, [tests, search, subject, status])

  const isFiltered = search.trim() !== "" || subject !== ALL || status !== ALL

  const handleCreate = () => navigate("/task/create")

  const handleView = (test: Test) =>
    toast.add({ title: "View Test", description: `Opening “${test.name}”.` })

  const handleEdit = (test: Test) =>
    toast.add({ title: "Edit Test", description: `Editing “${test.name}”.` })

  const handleDelete = (test: Test) => {
    setTests((current) => current.filter((item) => item.id !== test.id))
    toast.add({ title: "Test Deleted", description: `“${test.name}” was removed.` })
  }

  const resetFilters = () => {
    setSearch("")
    setSubject(ALL)
    setStatus(ALL)
  }

  const controlClass =
    "h-11 rounded-lg border-[#e4e9f4] text-sm text-[#33415c] shadow-none data-[size=default]:h-11"

  return (
    <div className="p-8">
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

      {/* Toolbar: search + filters */}
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#eef2fb] bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#9aa6be]"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by test name or subject"
            className={`${controlClass} h-11 w-full pl-10 placeholder:text-[#9aa6be]`}
            aria-label="Search tests"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={subject} onValueChange={(value) => setSubject(value as string)}>
            <SelectTrigger className={`${controlClass} w-full sm:w-[170px]`} aria-label="Filter by subject">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All Subjects</SelectItem>
              {SUBJECTS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={(value) => setStatus(value as string)}>
            <SelectTrigger className={`${controlClass} w-full sm:w-[170px]`} aria-label="Filter by status">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All Statuses</SelectItem>
              {TEST_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isFiltered ? (
            <Button
              type="button"
              variant="ghost"
              onClick={resetFilters}
              className="h-11 rounded-lg px-4 text-sm font-medium text-[#7581a0] hover:bg-[#f1f3fc]"
            >
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      {/* Result summary */}
      <p className="mt-4 text-sm text-[#68758f]">
        Showing <span className="font-medium text-[#33415c]">{filteredTests.length}</span> of{" "}
        <span className="font-medium text-[#33415c]">{tests.length}</span> tests
      </p>

      {/* Table (md and up) */}
      <div className="mt-3 hidden overflow-hidden rounded-xl border border-[#eef2fb] bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#eef2fb] bg-[#f8faff] text-xs font-semibold tracking-wide text-[#8a95ad] uppercase">
                <th className="px-6 py-3.5">Test Name</th>
                <th className="px-6 py-3.5">Subject</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Created Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f4fb]">
              {filteredTests.map((test) => (
                <tr key={test.id} className="transition-colors hover:bg-[#fafbff]">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[#2f3b52]">{test.name}</p>
                    <p className="mt-0.5 text-xs text-[#9aa6be]">
                      {test.questions} Questions · {test.duration} min
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#52607a]">{test.subject}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={test.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-[#52607a]">{formatDate(test.createdAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <RowAction label="View" onClick={() => handleView(test)}>
                        <Eye size={16} />
                      </RowAction>
                      <RowAction label="Edit" onClick={() => handleEdit(test)}>
                        <Pencil size={16} />
                      </RowAction>
                      <RowAction label="Delete" variant="danger" onClick={() => handleDelete(test)}>
                        <Trash2 size={16} />
                      </RowAction>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTests.length === 0 ? <EmptyState isFiltered={isFiltered} onCreate={handleCreate} /> : null}
      </div>

      {/* Cards (small screens) */}
      <div className="mt-3 space-y-3 md:hidden">
        {filteredTests.map((test) => (
          <div key={test.id} className="rounded-xl border border-[#eef2fb] bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#2f3b52]">{test.name}</p>
                <p className="mt-0.5 text-xs text-[#9aa6be]">
                  {test.subject} · {test.questions} Questions · {test.duration} min
                </p>
              </div>
              <StatusBadge status={test.status} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#f1f4fb] pt-3">
              <span className="text-xs text-[#8a95ad]">Created {formatDate(test.createdAt)}</span>
              <div className="flex items-center gap-1">
                <RowAction label="View" onClick={() => handleView(test)}>
                  <Eye size={16} />
                </RowAction>
                <RowAction label="Edit" onClick={() => handleEdit(test)}>
                  <Pencil size={16} />
                </RowAction>
                <RowAction label="Delete" variant="danger" onClick={() => handleDelete(test)}>
                  <Trash2 size={16} />
                </RowAction>
              </div>
            </div>
          </div>
        ))}

        {filteredTests.length === 0 ? (
          <div className="rounded-xl border border-[#eef2fb] bg-white">
            <EmptyState isFiltered={isFiltered} onCreate={handleCreate} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

type RowActionProps = {
  label: string
  onClick: () => void
  variant?: "default" | "danger"
  children: React.ReactNode
}

const RowAction = ({ label, onClick, variant = "default", children }: RowActionProps) => {
  const colors =
    variant === "danger"
      ? "text-[#e5646d] hover:bg-[#fdECEE]"
      : "text-[#6a7899] hover:bg-[#eef3ff] hover:text-[#4f6fff]"
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${colors}`}
    >
      {children}
    </button>
  )
}

const EmptyState = ({
  isFiltered,
  onCreate,
}: {
  isFiltered: boolean
  onCreate: () => void
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ff] text-[#4f6fff]">
        <Search size={20} />
      </div>
      <p className="mt-4 text-sm font-medium text-[#33415c]">
        {isFiltered ? "No tests match your filters" : "No tests yet"}
      </p>
      <p className="mt-1 text-sm text-[#8a95ad]">
        {isFiltered
          ? "Try adjusting your search or filters."
          : "Create your first test to get started."}
      </p>
      {!isFiltered ? (
        <Button type="button" onClick={onCreate} className="mt-5 h-10 rounded-lg px-5 text-sm font-medium">
          <Plus size={16} />
          Create New Test
        </Button>
      ) : null}
    </div>
  )
}

export default TaskDashboard
