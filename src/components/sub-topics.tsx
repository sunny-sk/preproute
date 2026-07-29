import React, { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import type { SubTopicResponse } from "@/types"
import { getSubTopicsApi } from "@/services/tests"
import { Field, FieldError, FieldLabel } from "./ui/field"
import type { FieldErrors } from "react-hook-form"

interface SubTopicsProps {
  labelClass: string
  controlClass: string
  onChange?: (subTopicIds: string[]) => void
  value?: string[]
  topicIds: string[]
  dataInvalid?: boolean
  errors?: FieldErrors<{ subTopicId: string[] }>
}

const SubTopics = ({
  labelClass,
  controlClass,
  onChange = () => {},
  value = [],
  topicIds = [],
  dataInvalid,
  errors,
}: SubTopicsProps) => {
  const [subTopics, setSubTopics] = useState<SubTopicResponse["data"]>([])
  const [loadedKey, setLoadedKey] = useState<string | null>(null)

  // topicIds is a fresh array on every render, so key the effect on a stable
  // string to avoid re-fetching each render.
  const topicsKey = [...topicIds].sort().join(",")
  // Derived so we never call setState synchronously inside the effect.
  const loading = topicIds.length > 0 && loadedKey !== topicsKey
  const options = topicIds.length ? subTopics : []

  useEffect(() => {
    if (!topicsKey) return
    let active = true
    const ids = topicsKey.split(",")
    Promise.all(ids.map((topicId) => getSubTopicsApi(topicId))).then(
      (responses) => {
        if (!active) return
        const merged = responses
          .filter((response) => response.status === "success")
          .flatMap((response) => response.data)
        // Different topics may share sub-topics, so dedupe by id.
        const unique = Array.from(
          new Map(merged.map((subTopic) => [subTopic.id, subTopic])).values()
        )
        setSubTopics(unique)
        setLoadedKey(topicsKey)
      }
    )
    return () => {
      active = false
    }
  }, [topicsKey])

  return (
    <Field data-invalid={dataInvalid}>
      <FieldLabel htmlFor="subTopic" className={labelClass}>
        Sub Topic
      </FieldLabel>
      {loading ? (
        <Skeleton className={controlClass} />
      ) : (
        <Select
          multiple
          value={value}
          onValueChange={(subTopicIds: string[]) => onChange(subTopicIds)}
        >
          <SelectTrigger
            id="subTopic"
            className={controlClass}
            aria-invalid={dataInvalid}
          >
            <SelectValue placeholder="Choose from Drop-down">
              {(selected: string[]) =>
                selected.length
                  ? options
                      .filter((subTopic) => selected.includes(subTopic.id))
                      .map((subTopic) => subTopic.name)
                      .join(", ")
                  : "Choose from Drop-down"
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {options.map((subTopic) => (
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
