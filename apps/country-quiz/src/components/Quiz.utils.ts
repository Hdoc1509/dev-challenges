import type { Question } from "../types";

type CheckOptions = {
  option: Question["answerOptions"][number];
  selectedAnswer: Question["selectedAnswer"];
  correctAnswer: Question["correctAnswer"];
};

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
