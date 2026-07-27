import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { SubjectResponse } from '@/types'
import { getSubjectsApi } from '@/services/tests'

interface SubjectsProps {
  labelClass: string
  controlClass: string
  onChange?: (subjectId: string | null) => void
}

const Subjects = ({ labelClass, controlClass, onChange = () => { } }: SubjectsProps) => {
  const [subjects, setSubjects] = useState<SubjectResponse["data"]>([])
  const [loading, setLoading] = useState(true);

  const init = async () => {
    setLoading(true)
    const response = await getSubjectsApi()
    if (response.status === "success") {
      setSubjects(response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <label htmlFor="subject" className={labelClass}>
        Subject
      </label>
      {loading ? (
        <Skeleton className={controlClass} />
      ) : (
        <Select onValueChange={(subjectName: string | null) => {
          const subjectId = subjectName
            ? subjects.find((subject) => subject.name === subjectName)?.id ?? null
            : null
          onChange(subjectId)
        }}>
          <SelectTrigger id="subject" className={controlClass}>
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
    </div>
  )
}

export default React.memo(Subjects)