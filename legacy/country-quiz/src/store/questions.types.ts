import type { FetchingState } from "@lib/fetcher";
import type { STATUS } from "@/constants";
import type { Question } from "../types";

export type StoreFetchingState =
  | FetchingState<{ questions: Question[] }>
  | {
      status: typeof STATUS.OVER;
      questions: Question[];
      error?: never;
    };
export type State = StoreFetchingState & {
  currentQuestionIndex: number;
};

export type Action = {
  setQuestionsOver: () => void;
  selectAnswer: (questionId: number, answer: string) => void;
  goNextQuestion: () => void;
  loadQuestions: () => Promise<void>;
  tryAgain: () => void;
};
