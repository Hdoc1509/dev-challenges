import type { PropsWithChildren } from "react";
import type { Question } from "../types";
import "./QuizCard.scss";

type Props = {
  selectedAnswer: Question["selectedAnswer"];
};

export const QuizCard = ({
  children,
  selectedAnswer,
}: PropsWithChildren<Props>) => {
  return (
    <div className="quiz-card" data-answer={selectedAnswer}>
      {children}
    </div>
  );
};
