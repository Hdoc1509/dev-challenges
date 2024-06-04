import { create } from "zustand";
import type { Question } from "../types";

type Status = "idle" | "loading" | "success" | "error" | "over";

type State = {
  status: Status;
  questions: Question[];
  currentQuestionIndex: number;
};

type Action = {
  setStatus: (status: Status) => void;
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
