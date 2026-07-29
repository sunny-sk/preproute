import axios from "axios"

// Relative by default so requests are same-origin and proxied to the backend
export const BASE_URL =  "/api"

export const URLS = {
  LOGIN: `/auth/login`,
  SUBJECTS: `/subjects`,
  TOPICS: `/topics/subject/:subjectId`, // `/topics/subject/:subjectId`
  SUB_TOPICS: `/sub-topics/topic/:topicId`, // `/subtopics/topic/:topicId`
  ALL_TESTS: `/tests`,
  CREATE_TEST: `/tests`,
  GET_TEST_BY_ID: `/tests/:id`,
  UPDATE_TEST: `/tests/:id`,
  DELETE_TEST: `/tests/:id`,
  BULK_CREATE_QUESTIONS: `/questions/bulk`,
}

export const USER_AUTH_KEY =
  import.meta.env.VITE_USER_AUTH_KEY || "user-storage"

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
