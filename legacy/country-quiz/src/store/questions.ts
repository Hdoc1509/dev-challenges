import { create } from "zustand";
import type { Question, Status } from "../types";

type State = {
  status: Status;
  error?: Error;
  questions: Question[];
  currentQuestionIndex: number;
};

type Action = {
  setStatus: (status: Status) => void;
  setError: (error: Error) => void;
  setQuestions: (questions: Question[]) => void;
  selectAnswer: (questionId: number, answer: string) => void;
  goNextQuestion: () => void;
  reset: () => void;
};

const initialState: State = {
  status: "idle",
  questions: [],
  currentQuestionIndex: 0,
};

export const useQuestionStore = create<State & Action>()((set, get) => {
  return {
    ...initialState,

    setStatus: (status: Status) => set({ status }),
    setError: (error: Error) => set({ error }),
    setQuestions: (questions: Question[]) => set({ questions }),
    selectAnswer: (questionId: number, answer: string) => {
      const { questions } = get();
      const newQuestions = structuredClone(questions);
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

      if (newQuestionIndex < questions.length) {
        set({ currentQuestionIndex: newQuestionIndex });
      }
    },
    reset: () => set(initialState),
  };
});
