import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { SubTopicResponse } from '@/types'
import { getSubTopicsApi } from '@/services/tests'
import { Field, FieldError, FieldLabel } from './ui/field'
import type { FieldErrors } from 'react-hook-form'

interface SubTopicsProps {
  labelClass: string
  controlClass: string
  onChange?: (subTopicIds: string[]) => void
  value?: string[]
  topicIds: string[]
  dataInvalid?: boolean
  errors?: FieldErrors<{ subTopicId: string[] }>
}

const SubTopics = ({ labelClass, controlClass, onChange = () => { }, value = [], topicIds = [], dataInvalid, errors }: SubTopicsProps) => {
  const [subTopics, setSubTopics] = useState<SubTopicResponse["data"]>([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    if (!topicIds.length) {
      setSubTopics([])
      return
    }
    setLoading(true)
    const responses = await Promise.all(topicIds.map((topicId) => getSubTopicsApi(topicId)))
    const merged = responses
      .filter((response) => response.status === "success")
      .flatMap((response) => response.data)
    // Different topics may share sub-topics, so dedupe by id.
    const unique = Array.from(new Map(merged.map((subTopic) => [subTopic.id, subTopic])).values())
    setSubTopics(unique)
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [topicIds])

  return (
    <Field data-invalid={dataInvalid}>
      <FieldLabel htmlFor="subTopic" className={labelClass}>
        Sub Topic
      </FieldLabel>
      {loading ? (
        <Skeleton className={controlClass} />
      ) : (
        <Select multiple value={value} onValueChange={(subTopicIds: string[]) => onChange(subTopicIds)}>
          <SelectTrigger id="subTopic" className={controlClass} aria-invalid={dataInvalid}>
            <SelectValue placeholder="Choose from Drop-down">
              {(selected: string[]) =>
                selected.length
                  ? subTopics
                    .filter((subTopic) => selected.includes(subTopic.id))
                    .map((subTopic) => subTopic.name)
                    .join(", ")
                  : "Choose from Drop-down"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {subTopics.map((subTopic) => (
              <SelectItem key={subTopic.id} value={subTopic.id}>
                {subTopic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {errors?.subTopicId && <FieldError errors={[errors.subTopicId]} />}
    </Field>
  )
}

export default React.memo(SubTopics)
