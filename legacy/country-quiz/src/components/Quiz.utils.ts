import type { Question } from "../types";

type CheckOptions = {
  option: string;
} & Pick<Question, "selectedAnswer" | "correctAnswer">;

export const getAnswerData = ({
  option,
  selectedAnswer,
  correctAnswer,
}: CheckOptions) => {
  if (selectedAnswer == null) return;

  if (correctAnswer === option)
    return {
      className: "correct",
      icon: "check_circle",
    } as const;

  if (selectedAnswer === option && correctAnswer !== option) {
    return {
      className: "wrong",
      icon: "cancel",
    } as const;
  }
};
