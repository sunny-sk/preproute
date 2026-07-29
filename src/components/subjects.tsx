import React, { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { SubjectResponse } from "@/types"
import { getSubjectsApi } from "@/services/tests"
import type { FieldErrors } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "./ui/field"

interface SubjectsProps {
  labelClass: string
  controlClass: string
  value?: string | null
  onChange?: (subjectId: string | null) => void
  dataInvalid?: boolean
  errors?: FieldErrors<{ subjectId: string | null }>
}

const Subjects = ({
  labelClass,
  controlClass,
  value = null,
  onChange = () => { },
  dataInvalid,
  errors,
}: SubjectsProps) => {
  const [subjects, setSubjects] = useState<SubjectResponse["data"]>([])
  const [loading, setLoading] = useState(true)

  // The Select works with subject names, while the form stores the subject id.
  const selectedName = value
    ? (subjects.find((subject) => subject.id === value)?.name ?? undefined)
    : undefined

  const init = async () => {
    setLoading(true)
    const response = await getSubjectsApi()
    if (response.status === "success") {
      setSubjects(response.data)
    }
    setLoading(false)
  }

  const onChangeHandler = (subjectName: string | null) => {
    const subjectId = subjectName
      ? (subjects.find((subject) => subject.name === subjectName)?.id ??
        null)
      : null
    onChange(subjectId)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Field data-invalid={dataInvalid}>
      <FieldLabel htmlFor="subject" className={labelClass}>
        Subject
      </FieldLabel>
      {loading ? (
        <Skeleton className={controlClass} />
      ) : (
        <Select
          value={selectedName}
          onValueChange={onChangeHandler}
        >
          <SelectTrigger
            id="subject"
            className={controlClass}
            aria-invalid={dataInvalid}
          >
            <SelectValue placeholder="Choose from Drop-down" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.name}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {errors?.subjectId && <FieldError errors={[errors.subjectId]} />}
    </Field>
  )
}

export default React.memo(Subjects)
