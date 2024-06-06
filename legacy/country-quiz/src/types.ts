import type { QuestionCategory } from "./constants";

export type Question = {
  id: number;
  category: QuestionCategory;
  question: string;
  flagUrl?: string;
  correctAnswer: string;
  answerOptions: string[];
  selectedAnswer: string | null;
  hasBeenAnsweredCorrectly: boolean | null;
};

export type Country = {
  flagUrl: string;
  name: string;
  capital: string[];
  region: string;
};
