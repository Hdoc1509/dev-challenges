import type { Question } from "../types";

type CheckOptions = {
  option: string;
} & Pick<Question, "selectedAnswer" | "correctAnswer">;

export const getAnswerClassName = ({
  option,
  selectedAnswer,
  correctAnswer,
}: CheckOptions) => {
  if (selectedAnswer == null) return;
  if (correctAnswer === option) return "correct";
  if (selectedAnswer === option && correctAnswer !== option) return "wrong";
};

export const getAnswerIcon = ({
  option,
  selectedAnswer,
  correctAnswer,
}: CheckOptions) => {
  if (selectedAnswer == null) return;
  if (correctAnswer === option) return "check_circle";
  if (selectedAnswer === option && correctAnswer !== option) return "cancel";
};
