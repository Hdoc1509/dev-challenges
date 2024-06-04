import { useQuestionStore } from "../store/questions";
import { clsx } from "clsx";
import { Quiz } from "./Quiz";
import { Loader } from "./Loader";
import { QuestionCategories, type QuestionCategory } from "../constants";
import "./QuizCard.scss";

type Props = {
  category?: QuestionCategory;
  resultsElement: React.ReactNode;
};

export const QuizCard = ({ category, resultsElement }: Props) => {
  const status = useQuestionStore((s) => s.status);

  const className = clsx("quiz-card", {
    "quiz-card--over": status === "over",
    "quiz-card--flag": category === QuestionCategories.FlagOfCountry,
    "quiz-card--loading": status === "loading",
  });

  return (
    <div className={className}>
      {status === "loading" && <Loader />}
      {status === "success" && <Quiz />}
      {status === "over" && resultsElement}
    </div>
  );
};
