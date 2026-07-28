import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { TopicResponse } from '@/types'
import { getTopicsApi } from '@/services/tests'
import type { FieldErrors } from 'react-hook-form'
import { Field, FieldLabel, FieldError } from './ui/field'

interface TopicProps {
  labelClass: string
  controlClass: string
  onChange?: (topicIds: string[]) => void
  value?: string[]
  subjectId: string | null
  dataInvalid?: boolean
  errors?: FieldErrors<{ topicId: string[] }>
}

const Topic = ({ labelClass, controlClass, onChange = () => { }, value = [], subjectId = null, dataInvalid, errors, ...props }: TopicProps) => {
  const [topics, setTopics] = useState<TopicResponse["data"]>([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    if (!subjectId) return;
    setLoading(true)
    const response = await getTopicsApi(subjectId as string)
    if (response.status === "success") {
      setTopics(response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [subjectId])

  return (
    <Field data-invalid={dataInvalid} >
      <FieldLabel htmlFor="topic" className={labelClass}>
        Topic
      </FieldLabel>
      {loading ? (
        <Skeleton className={controlClass} />
      ) : (
        <Select multiple value={value} onValueChange={(topicIds: string[]) => onChange(topicIds)}>
          <SelectTrigger id="topic" className={controlClass} aria-invalid={dataInvalid}>
            <SelectValue placeholder="Choose from Drop-down">
              {(selected: string[]) =>
                selected.length
                  ? topics
                    .filter((topic) => selected.includes(topic.id))
                    .map((topic) => topic.name)
                    .join(", ")
                  : "Choose from Drop-down"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic.id} value={topic.id}>
                {topic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {errors?.topicId && (
        <FieldError errors={[errors.topicId]} />
      )}
    </Field>
  )
}

export default React.memo(Topic)
