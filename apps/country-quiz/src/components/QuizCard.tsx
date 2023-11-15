import { clsx } from "clsx";
import type { PropsWithChildren } from "react";
import "./QuizCard.scss";

type Props = {
  isAnswered: boolean;
  isOver: boolean;
};

export const QuizCard = ({
  isAnswered,
  isOver,
  children,
}: PropsWithChildren<Props>) => {
  const className = clsx("quiz-card", {
    "quiz-card--answered": isAnswered,
    "quiz-card--over": isOver
  });

  return <div className={className}>{children}</div>;
};
