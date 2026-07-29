import React, { useEffect, useState } from "react"
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
import { Field, FieldLabel } from "./ui/field"

interface SubTopicSelectProps {
  labelClass?: string
  controlClass?: string
  onChange?: (subTopicId: string) => void
  value?: string
  topicId: string
}

/**
 * Single-select sub-topic dropdown for the question editor. Mirrors
 * <DifficultyLevel/>, with options being the sub-topics of the selected topic.
 */
const SubTopicSelect = ({
  labelClass,
  controlClass,
  onChange = () => {},
  value = "",
  topicId = "",
}: SubTopicSelectProps) => {
  const [subTopics, setSubTopics] = useState<SubTopicResponse["data"]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    const init = async () => {
      if (!topicId) {
        setSubTopics([])
        setLoading(false)
        return
      }
      setLoading(true)
      const response = await getSubTopicsApi(topicId)
      if (!active) return
      setSubTopics(response.status === "success" ? response.data : [])
      setLoading(false)
    }
    init()
    return () => {
      active = false
    }
  }, [topicId])

  return (
    <Field>
      <FieldLabel htmlFor="question-sub-topic" className={labelClass}>
        Sub-topic
      </FieldLabel>
      {loading ? (
        <Skeleton className={controlClass} />
      ) : (
        <Select
          value={value || null}
          onValueChange={(subTopicId: string | null) =>
            onChange(subTopicId ?? "")
          }
        >
          <SelectTrigger
            id="question-sub-topic"
            className={controlClass}
            disabled={!topicId}
          >
            <SelectValue
              placeholder={
                topicId ? "Choose from Drop-down" : "Select a topic first"
              }
            >
              {(selected: string) =>
                subTopics.find((subTopic) => subTopic.id === selected)?.name ??
                (topicId ? "Choose from Drop-down" : "Select a topic first")
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
    </Field>
  )
}

export default React.memo(SubTopicSelect)
