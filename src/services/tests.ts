import { api, USER_AUTH_KEY } from "@/config"
import { URLS } from "@/config"
import type { SubjectResponse } from "@/types"

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
  const response = await api.get(URLS.TOPICS.replace(":subjectId", subjectId))
  return response.data
}

export const getSubTopicsApi = async (topicId: string) => {
  const response = await api.get(URLS.SUB_TOPICS.replace(":topicId", topicId))
  return response.data
}

export const getAllTestsApi = async () => {
  const response = await api.get(URLS.ALL_TESTS)
  return response.data
}
