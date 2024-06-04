import { useQuestionStore } from "../store/questions";
import { clsx } from "clsx";
import { Quiz } from "./Quiz";
import { Results } from "./Results";
import { Loader } from "./Loader";
import { QuestionCategories } from "../constants";
import "./QuizCard.scss";

type Props = {
  tryAgain: () => void;
};

export const QuizCard = ({ tryAgain }: Props) => {
  const status = useQuestionStore((s) => s.status);
  const questions = useQuestionStore((s) => s.questions);
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);

  const question = questions[currentQuestionIndex];

  const className = clsx("quiz-card", {
    "quiz-card--over": status === "over",
    "quiz-card--flag": question.category === QuestionCategories.FlagOfCountry,
    "quiz-card--loading": status === "loading",
  });

  return (
    <div className={className}>
      {status === "loading" && <Loader />}
      {status === "success" && <Quiz />}
      {status === "over" && <Results tryAgain={tryAgain} />}
    </div>
  );
};
