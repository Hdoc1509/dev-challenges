import { create } from "zustand";
import { getQuestions } from "../services/questions";
import type { Question } from "../types";

type State = {
  questions: Question[];
  currentQuestionIndex: number;
  correctAnswers: number;
  answeredQuestions: number;
};

type Action = {
  getQuestions: (limit?: number) => Promise<void>;
  selectAnswer: (questionId: number, answer: string) => void;
  goNextQuestion: () => void;
  reset: () => void;
};

const initialState: State = {
  questions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0,
  answeredQuestions: 0,
};

export const useQuestionStore = create<State & Action>()((set, get) => {
  return {
    ...initialState,

    getQuestions: async (limit?: number) => {
      const questions = await getQuestions(limit);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set({ questions });
    },
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

      // TODO: Update correctAnswers
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
