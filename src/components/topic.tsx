import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TopicResponse } from '@/types'
import { getTopicsApi } from '@/services/tests'

interface TopicProps {
  labelClass: string
  controlClass: string
  onChange?: (topicId: string | null) => void
  subjectId: string | null
}

const Topic = ({ labelClass, controlClass, onChange = () => { }, subjectId = null }: TopicProps) => {
  const [topics, setTopics] = useState<TopicResponse["data"]>([])
  const init = async () => {
    if(!subjectId) return;
    const response = await getTopicsApi(subjectId as string)
    if (response.status === "success") {
      setTopics(response.data)
    }
  }

  useEffect(() => {
    if (subjectId) {
      init()
    }
  }, [subjectId])

  return (
    <div>
      <label htmlFor="topic" className={labelClass}>
        Topic
      </label>
      <Select onValueChange={(topicName: string | null) => {
        const topicId = topicName
          ? topics.find((topic) => topic.name === topicName)?.id ?? null
          : null
        onChange(topicId)
      }}>
        <SelectTrigger id="topic" className={controlClass}>
          <SelectValue placeholder="Choose from Drop-down" />
        </SelectTrigger>
        <SelectContent>
          {topics.map((topic) => (
            <SelectItem key={topic.id} value={topic.name}>
              {topic.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default React.memo(Topic)