import { create } from "zustand";
import { getQuestions } from "@/services/questions";
import { STATUS } from "@/constants";
import type { Question } from "../types";
import type { StoreFetchingState, State, Action } from "./questions.types";

const initialState: State = {
  status: STATUS.IDLE,
  currentQuestionIndex: 0,
};

export const useQuestionStore = create<State & Action>()((set, get) => {
  return {
    ...initialState,

    setQuestionsOver: () => set({ status: STATUS.OVER }),
    selectAnswer: (questionId: number, answer: string) => {
      const { questions } = get();
      const newQuestions = structuredClone(questions as Question[]);
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
      const question = newQuestions[questionIndex];

      newQuestions[questionIndex] = {
        ...question,
        selectedAnswer: answer,
        hasBeenAnsweredCorrectly: answer === question.correctAnswer,
      };

      set({ questions: newQuestions });
    },
    goNextQuestion: () => {
      const { currentQuestionIndex, questions } = get();
      const newQuestionIndex = currentQuestionIndex + 1;

      if (newQuestionIndex < questions!.length)
        set({ currentQuestionIndex: newQuestionIndex });
    },

    loadQuestions: async () => {
      set({ status: STATUS.LOADING });

      const [error, questions] = await getQuestions(10);

      if (error != null) return set({ status: STATUS.ERROR, error });

      set({ status: STATUS.SUCCESS, questions });
    },

    tryAgain: () => {
      set(initialState);
      get().loadQuestions();
    },
  };
});

export const useQuestionFetchingSelector = () =>
  useQuestionStore(
    (s) =>
      ({
        status: s.status,
        error: s.error,
        questions: s.questions,
      }) as StoreFetchingState,
  );

// intitialize store on module load
useQuestionStore.getState().loadQuestions();
