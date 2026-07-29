import { ChevronDown, ChevronUp } from "lucide-react"

type StepperInputProps = {
  id: string
  value: number
  onChange: (value: number) => void
}
const formatSigned = (value: number) => (value >= 0 ? `+${value}` : `${value}`)
const StepperInput = ({ id, value, onChange }: StepperInputProps) => {
  return (
    <div className="flex h-12 w-[120px] items-center justify-between rounded-lg border border-line-strong px-4">
      <span className="text-sm font-medium text-body">
        {formatSigned(value)}
      </span>
      <div className="flex flex-col text-placeholder">
        <button
          type="button"
          aria-label={`Increase ${id}`}
          onClick={() => onChange(value + 1)}
          className="transition-colors hover:text-brand"
        >
          <ChevronUp size={14} />
        </button>
        <button
          type="button"
          aria-label={`Decrease ${id}`}
          onClick={() => onChange(value - 1)}
          className="transition-colors hover:text-brand"
        >
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  )
}
export default StepperInput
