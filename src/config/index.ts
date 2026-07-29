import axios from "axios"
export const BASE_URL = import.meta.env.VITE_API_URL || "https://admin-moderator-backend-staging.up.railway.app/api"

export const URLS = {
  LOGIN: `/auth/login`,
  SUBJECTS: `/subjects`,
  TOPICS: `/topics/subject/:subjectId`, // `/topics/subject/:subjectId`
  SUB_TOPICS: `/sub-topics/topic/:topicId`, // `/subtopics/topic/:topicId`
  ALL_TESTS: `/tests`,
  CREATE_TEST: `/tests`,
  GET_TEST_BY_ID: `/tests/:id`,
  UPDATE_TEST: `/tests/:id`,
}

export const USER_AUTH_KEY =
  import.meta.env.VITE_USER_AUTH_KEY || "user-storage"

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
