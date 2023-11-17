import type { Question } from "./types";

export const QUESTION = {
  countryOfCapital: (capital: string) => `${capital} is the capital of...`,
  flagOfCountry: () => "Which country does this flag belong to?",
};

export type QuestionCategory = keyof typeof QUESTION;

type CheckOptions = {
  option: Question["answerOptions"][number];
  selectedAnswer: Question["selectedAnswer"];
  correctAnswer: Question["correctAnswer"];
};

export const randomSort = <T>(arr: T[]): T[] =>
  structuredClone(arr).sort(() => Math.random() - 0.5);

export const getAnswerClassName = ({
  option,
  selectedAnswer,
  correctAnswer,
}: CheckOptions) => {
  if (selectedAnswer == null) return;
  if (correctAnswer === option) return "correct";
  if (selectedAnswer === option && correctAnswer !== option) return "wrong";
};

export const getAnswerIconEnd = ({
  option,
  selectedAnswer,
  correctAnswer,
}: CheckOptions) => {
  if (selectedAnswer == null) return;
  if (correctAnswer === option) return "check_circle";
  if (selectedAnswer === option && correctAnswer !== option) return "cancel";
};
