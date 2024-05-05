import { clsx } from "clsx";
import { Loader } from "./Loader";
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
}: React.PropsWithChildren<Props>) => {
  const className = clsx("quiz-card", {
    "quiz-card--over": isOver,
    "quiz-card--flag": category === QuestionCategories.FlagOfCountry,
    "quiz-card--loading": isLoading,
  });

  return <div className={className}>{isLoading ? <Loader /> : children}</div>;
};
