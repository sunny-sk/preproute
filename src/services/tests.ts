import { api, USER_AUTH_KEY } from "@/config"
import { URLS } from "@/config"
import type {
  BulkQuestionPayload,
  BulkQuestionsResponse,
  SubjectResponse,
  SubTopicResponse,
  TestResponse,
  TestsResponse,
  TopicResponse,
} from "@/types"
import type { CreateTest, CreateTestPayload } from "@/validations"
import { mapTestToForm } from "@/utils/test-mapper"

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
  const response = await api.get<TestsResponse>(URLS.ALL_TESTS, {
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

export const getTestByIdApi = async (id: string) => {
  const response = await api.get<TestResponse>(
    URLS.GET_TEST_BY_ID.replace(":id", id),
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.data
}

export const updateTestById = async (id: string, data: CreateTestPayload) => {
  const response = await api.put<TestResponse>(
    URLS.UPDATE_TEST.replace(":id", id),
    data,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.data
}

export const deleteTestApi = async (id: string) => {
  const response = await api.delete<TestResponse>(
    URLS.DELETE_TEST.replace(":id", id),
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.data
}

export const bulkCreateQuestionsApi = async (
  questions: BulkQuestionPayload[]
) => {
  const response = await api.post<BulkQuestionsResponse>(
    URLS.BULK_CREATE_QUESTIONS,
    { questions },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.data
}

export const publishTestApi = async (id: string, questionIds: string[]) => {
  const response = await api.put<TestResponse>(
    URLS.UPDATE_TEST.replace(":id", id),
    { questions: questionIds, status: "live" },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
  return response.data
}

/**
 * load test by id and format it in the shape the form expects.
 *
 * The `GET /tests/:id` returns `subject` / `topics` / `sub_topics` as
 * name not the id, but the form's require ids to work.
 */
export const getTestForEditApi = async (id: string): Promise<CreateTest> => {
  const testRes = await getTestByIdApi(id)
  if (testRes.status !== "success") {
    throw new Error(testRes.message || "Failed to load test")
  }
  const test = testRes.data

  // Subject name -> id
  const subjectsRes = await getSubjectsApi()
  const subjectId =
    subjectsRes.data.find((subject) => subject.name === test.subject)?.id ?? ""

  // Topic names -> ids (topics belong to the resolved subject)
  let topicId: string[] = []
  let subTopicId: string[] = []

  if (subjectId) {
    const topicsRes = await getTopicsApi(subjectId)
    topicId = topicsRes.data
      .filter((topic) => (test.topics ?? []).includes(topic.name))
      .map((topic) => topic.id)

    // Sub-topic names -> ids (sub-topics belong to the resolved topics)
    if (topicId.length) {
      const subTopicResponses = await Promise.all(
        topicId.map((topicIdItem) => getSubTopicsApi(topicIdItem))
      )
      const subTopics = subTopicResponses
        .filter((response) => response.status === "success")
        .flatMap((response) => response.data)
      // Different topics can share sub-topics, so dedupe by id before matching.
      const uniqueSubTopics = Array.from(
        new Map(subTopics.map((subTopic) => [subTopic.id, subTopic])).values()
      )
      subTopicId = uniqueSubTopics
        .filter((subTopic) => (test.sub_topics ?? []).includes(subTopic.name))
        .map((subTopic) => subTopic.id)
    }
  }

  return mapTestToForm(test, { subjectId, topicId, subTopicId })
}
