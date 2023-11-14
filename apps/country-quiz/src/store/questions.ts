import { create } from "zustand";
import { getMockQuestions } from "../services/questions";
import type { Question } from "../types";

type State = {
  questions: Question[];
  currentQuestionIndex: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  totalQuestions: number;
};

type Action = {
  getQuestions: (limit?: number) => Promise<void>;
  selectAnswer: (questionId: number, answer: string) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
};

const initialState: State = {
  questions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  unansweredQuestions: 0,
  totalQuestions: 0,
};

export const useQuestionStore = create<State & Action>()((set, get) => {
  return {
    ...initialState,

    getQuestions: async (limit?: number) => {
      const questions = await getMockQuestions(limit);

      set({
        questions: structuredClone(questions).sort(() => Math.random() - 0.5),
      });
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

      set({ questions: newQuestions });
    },
    goNextQuestion: () => {
      const { currentQuestionIndex, questions } = get();
      const newQuestionIndex = currentQuestionIndex + 1;

      if (newQuestionIndex < questions.length) {
        set({ currentQuestionIndex: newQuestionIndex });
      }
    },
    goPrevQuestion: () => {},
    reset: () => set(initialState),
  };
});
