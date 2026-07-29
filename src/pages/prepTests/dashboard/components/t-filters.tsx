import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const ALL_STATUSES = "all"

type TFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
  statusOptions: string[]
}

const TFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  statusOptions,
}: TFiltersProps) => {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#9aa6be]"
        />
        <Input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by test name or subject"
          className="h-11 rounded-lg border-[#eef2fb] bg-[#f8faff] pl-9 text-sm"
        />
      </div>

      {/* Status filter */}
      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value ?? ALL_STATUSES)}
      >
        <SelectTrigger
          aria-label="Filter by status"
          className="w-full rounded-lg border-[#eef2fb] bg-[#f8faff] text-sm data-[size=default]:h-11 sm:w-52"
        >
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL_STATUSES}>All Statuses</SelectItem>
          {statusOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default TFilters
