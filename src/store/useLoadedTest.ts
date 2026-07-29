import {
  createEmptyQuestion,
  getQuestionStatus,
  type QuestionDraft,
} from "@/pages/prepTests/questions/components/question"
import type { TransformedTest } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface LoadedTestStore {
  testId: string | null
  setTestId: (testId: string | null) => void

  loadedTest: TransformedTest | null
  setLoadedTest: (test: TransformedTest) => void

  questions: QuestionDraft[]
  selectedIndex: number
  selectedQuestion: QuestionDraft | null

  initQuestions: (testId: string, count: number) => void
  setSelectedQuestion: (question: QuestionDraft) => void
  selectQuestion: (id: number) => void
  selectQuestionAt: (index: number) => void
  updateQuestionStatus: () => void
  resetSelectedQuestion: () => void

  resetTest: () => void
}

const useLoadedTest = create<LoadedTestStore>()(
  persist(
    (set) => ({
      testId: null,
      loadedTest: null,
      setTestId: (testId) => set({ testId }),
      setLoadedTest: (test) => set({ loadedTest: test }),

      questions: [],
      selectedIndex: 0,
      selectedQuestion: null,

      initQuestions: (testId, count) => {
        // this function check number of question in the test and create empty question if the number of question is less than the total number of question

        set((state) => {
          const total = Math.max(1, count || 1)

          if (state.testId !== testId || state.questions.length === 0) {
            const questions = Array.from({ length: total }, (_, i) =>
              createEmptyQuestion(i + 1)
            )
            return {
              testId,
              questions,
              selectedIndex: 0,
              selectedQuestion: questions[0],
            }
          }

          if (state.questions.length === total) {
            return {}
          }

          const questions =
            state.questions.length > total
              ? state.questions.slice(0, total)
              : [
                  ...state.questions,
                  ...Array.from(
                    { length: total - state.questions.length },
                    (_, i) =>
                      createEmptyQuestion(state.questions.length + i + 1)
                  ),
                ]

          const selectedIndex = Math.min(
            state.selectedIndex,
            questions.length - 1
          )
          return {
            questions,
            selectedIndex,
            selectedQuestion: questions[selectedIndex],
          }
        })
      },

      setSelectedQuestion: (question) =>
        set((state) => ({
          questions: state.questions.map((q, i) =>
            i === state.selectedIndex ? question : q
          ),
          selectedQuestion: question,
        })),

      selectQuestion: (id) =>
        set((state) => {
          const index = state.questions.findIndex((q) => q.id === id)
          if (index === -1) return state
          return {
            selectedIndex: index,
            selectedQuestion: state.questions[index],
          }
        }),

      selectQuestionAt: (index) =>
        set((state) => {
          if (!state.questions.length) return state
          const clamped = Math.min(
            Math.max(index, 0),
            state.questions.length - 1
          )
          return {
            selectedIndex: clamped,
            selectedQuestion: state.questions[clamped],
          }
        }),

      updateQuestionStatus: () =>
        set((state) => {
          if (!state.selectedQuestion) return state
          const status = getQuestionStatus(state.selectedQuestion)
          if (state.selectedQuestion.status === status) return state
          const updated = { ...state.selectedQuestion, status }
          return {
            questions: state.questions.map((q, i) =>
              i === state.selectedIndex ? updated : q
            ),
            selectedQuestion: updated,
          }
        }),

      resetSelectedQuestion: () =>
        set((state) => {
          if (!state.selectedQuestion) return state
          const question = createEmptyQuestion(state.selectedQuestion.id)
          return {
            questions: state.questions.map((q, i) =>
              i === state.selectedIndex ? question : q
            ),
            selectedQuestion: question,
          }
        }),

      resetTest: () =>
        set({
          testId: null,
          loadedTest: null,
          questions: [],
          selectedIndex: 0,
          selectedQuestion: null,
        }),
    }),
    {
      // Key in localStorage; keep it distinct from the user-auth store.
      name: "loaded-test-draft",
      // Only persist the draft data — actions are recreated on load.
      partialize: (state) => ({
        testId: state.testId,
        loadedTest: state.loadedTest,
        questions: state.questions,
        selectedIndex: state.selectedIndex,
        selectedQuestion: state.selectedQuestion,
      }),
    }
  )
)

export default useLoadedTest
