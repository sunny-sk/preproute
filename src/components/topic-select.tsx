import React, { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { TopicResponse } from "@/types"
import { getTopicsApi } from "@/services/tests"
import { Field, FieldLabel } from "./ui/field"

interface TopicSelectProps {
  labelClass?: string
  controlClass?: string
  onChange?: (topicId: string) => void
  value?: string
  subjectId: string | null
}

/**
 * Single-select topic dropdown for the question editor. Mirrors
 * <DifficultyLevel/> so the "Question settings" controls read consistently,
 * with options being the topics of the given subject.
 */
const TopicSelect = ({
  labelClass,
  controlClass,
  onChange = () => {},
  value = "",
  subjectId = null,
}: TopicSelectProps) => {
  const [topics, setTopics] = useState<TopicResponse["data"]>([])
  const [loadedFor, setLoadedFor] = useState<string | null>(null)

  // A skeleton shows whenever a subject is selected but its topics have not
  // loaded yet (derived so we never setState synchronously in the effect).
  const loading = !!subjectId && loadedFor !== subjectId
  const options = subjectId ? topics : []

  useEffect(() => {
    if (!subjectId) return
    let active = true
    getTopicsApi(subjectId).then((response) => {
      if (!active) return
      if (response.status === "success") {
        setTopics(response.data)
      }
      setLoadedFor(subjectId)
    })
    return () => {
      active = false
    }
  }, [subjectId])

  return (
    <Field>
      <FieldLabel htmlFor="question-topic" className={labelClass}>
        Topic
      </FieldLabel>
      {loading ? (
        <Skeleton className={controlClass} />
      ) : (
        <Select
          value={value || null}
          onValueChange={(topicId: string | null) => onChange(topicId ?? "")}
        >
          <SelectTrigger
            id="question-topic"
            className={controlClass}
            disabled={!subjectId}
          >
            <SelectValue
              placeholder={
                subjectId ? "Choose from Drop-down" : "Select a subject first"
              }
            >
              {(selected: string) =>
                options.find((topic) => topic.id === selected)?.name ??
                (subjectId ? "Choose from Drop-down" : "Select a subject first")
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((topic) => (
              <SelectItem key={topic.id} value={topic.id}>
                {topic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </Field>
  )
}

export default React.memo(TopicSelect)
