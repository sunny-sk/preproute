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

interface TopicProps {
  labelClass: string
  controlClass: string
  onChange?: (topicId: string | null) => void
  topicId: string | null
}

const Topic = ({ labelClass, controlClass, onChange = () => { }, topicId = null }: TopicProps) => {
  const [subTopics, setSubTopics] = useState<SubTopicResponse["data"]>([]);
  const [loading, setLoading] = useState(false);

  const init = async () => {
    if (!topicId) return;
    setLoading(true)
    const response = await getSubTopicsApi(topicId as string)
    if (response.status === "success") {
      setSubTopics(response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    init()
  }, [topicId])

  return (
    <div>
      <label htmlFor="subTopic" className={labelClass}>
        Sub Topic
      </label>
      {loading ? (
        <Skeleton className={controlClass} />
      ) : (
        <Select onValueChange={(subTopicName: string | null) => {
          const subTopicId = subTopicName
            ? subTopics.find((subTopic) => subTopic.name === subTopicName)?.id ?? null
            : null
          onChange(subTopicId)
        }}>
          <SelectTrigger id="subTopic" className={controlClass}>
            <SelectValue placeholder="Choose from Drop-down" />
          </SelectTrigger>
          <SelectContent>
            {subTopics.map((subTopic) => (
              <SelectItem key={subTopic.id} value={subTopic.name}>
                {subTopic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )
}

export default React.memo(Topic)