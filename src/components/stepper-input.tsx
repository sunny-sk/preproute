import { ChevronDown, ChevronUp } from "lucide-react"

type StepperInputProps = {
  id: string
  value: number
  onChange: (value: number) => void
}
const formatSigned = (value: number) => (value >= 0 ? `+${value}` : `${value}`)
const StepperInput = ({ id, value, onChange }: StepperInputProps) => {
  return (
    <div className="flex h-12 w-[120px] items-center justify-between rounded-lg border border-[#e4e9f4] px-4">
      <span className="text-sm font-medium text-[#33415c]">
        {formatSigned(value)}
      </span>
      <div className="flex flex-col text-[#9aa6be]">
        <button
          type="button"
          aria-label={`Increase ${id}`}
          onClick={() => onChange(value + 1)}
          className="transition-colors hover:text-[#4f6fff]"
        >
          <ChevronUp size={14} />
        </button>
        <button
          type="button"
          aria-label={`Decrease ${id}`}
          onClick={() => onChange(value - 1)}
          className="transition-colors hover:text-[#4f6fff]"
        >
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  )
}
export default StepperInput
