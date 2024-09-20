import { create } from "zustand";
import { getQuestions } from "@/services/questions";
import { STATUS } from "@/constants";
import type { Question, Status } from "../types";

type State = {
  status: Status;
  error?: Error;
  questions: Question[];
  currentQuestionIndex: number;
};

type Action = {
  setQuestionsOver: () => void;
  selectAnswer: (questionId: number, answer: string) => void;
  goNextQuestion: () => void;
  loadQuestions: () => Promise<void>;
  tryAgain: () => void;
};

const initialState: State = {
  status: "idle",
  questions: [],
  currentQuestionIndex: 0,
};

export const useQuestionStore = create<State & Action>()((set, get) => {
  return {
    ...initialState,

    setQuestionsOver: () => set({ status: STATUS.OVER }),
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

// intitialize store on module load
useQuestionStore.getState().loadQuestions();
