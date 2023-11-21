import { clsx } from "clsx";
import type { PropsWithChildren } from "react";
import { QuestionCategories, type QuestionCategory } from "../constants";
import "./QuizCard.scss";

type Props = {
  isOver: boolean;
  isLoading: boolean;
  category?: QuestionCategory;
};

export const QuizCard = ({
  isOver,
  isLoading,
  category,
  children,
}: PropsWithChildren<Props>) => {
  const className = clsx("quiz-card", {
    "quiz-card--over": isOver,
    "quiz-card--flag": category === QuestionCategories.FlagOfCountry,
    "quiz-card--loading": isLoading,
  });

  return <div className={className}>{children}</div>;
};
