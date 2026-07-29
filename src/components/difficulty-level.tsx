import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DIFFICULTY_LEVELS } from "@/constant"
import type { TestDifficulty } from "@/types"
import { Field, FieldError, FieldLabel } from "./ui/field"

const DEFAULT_LABEL_CLASS = "mb-2 block text-sm font-medium text-[#33415c]"
const DEFAULT_CONTROL_CLASS =
  "h-12 w-full rounded-lg border-[#e4e9f4] px-4 text-sm text-[#33415c] shadow-none placeholder:text-[#9aa6be] focus-visible:ring-2 data-[size=default]:h-12"

interface DifficultyLevelProps {
  labelClass?: string
  controlClass?: string
  value?: TestDifficulty | "" | null
  onChange?: (difficulty: TestDifficulty | null) => void
  dataInvalid?: boolean
  error?: { message?: string }
}

const DifficultyLevel = ({
  labelClass = DEFAULT_LABEL_CLASS,
  controlClass = DEFAULT_CONTROL_CLASS,
  value = null,
  onChange = () => {},
  dataInvalid,
  error,
}: DifficultyLevelProps) => {
  return (
    <Field data-invalid={dataInvalid}>
      <FieldLabel htmlFor="difficulty" className={labelClass}>
        Level of Difficulty
      </FieldLabel>
      <Select
        value={value || null}
        onValueChange={(difficulty: string | null) =>
          onChange((difficulty as TestDifficulty | null) ?? null)
        }
      >
        <SelectTrigger
          id="difficulty"
          className={controlClass}
          aria-invalid={dataInvalid}
        >
          <SelectValue placeholder="Choose from Drop-down" />
        </SelectTrigger>
        <SelectContent>
          {DIFFICULTY_LEVELS.map((level) => (
            <SelectItem key={level.id} value={level.id}>
              {level.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <FieldError errors={[error]} />}
    </Field>
  )
}

export default React.memo(DifficultyLevel)
