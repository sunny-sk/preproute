import { api, USER_AUTH_KEY } from "@/config"
import { URLS } from "@/config"
import type {
  SubjectResponse,
  SubTopicResponse,
  TestResponse,
  TopicResponse,
} from "@/types"
import type { CreateTestPayload } from "@/validations"

const getToken = () => {
  const res = localStorage.getItem(USER_AUTH_KEY)
  if (res) {
    return JSON.parse(res).state?.token
  }
  return null
}

export const getSubjectsApi = async () => {
  const response = await api.get<SubjectResponse>(URLS.SUBJECTS, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}

export const getTopicsApi = async (subjectId: string) => {
  const response = await api.get<TopicResponse>(
    URLS.TOPICS.replace(":subjectId", subjectId),
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.data
}

export const getSubTopicsApi = async (topicId: string) => {
  const response = await api.get<SubTopicResponse>(
    URLS.SUB_TOPICS.replace(":topicId", topicId),
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.data
}

export const getAllTestsApi = async () => {
  const response = await api.get<TestResponse>(URLS.ALL_TESTS, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}

export const createTestApi = async (data: CreateTestPayload) => {
  const response = await api.post<TestResponse>(URLS.CREATE_TEST, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return response.data
}
