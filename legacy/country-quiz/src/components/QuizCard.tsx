import { useQuestions } from "@/hooks/useQuestions";
import { clsx } from "clsx";
import { Quiz } from "./Quiz";
import { Results } from "./Results";
import { Loader } from "./Loader";
import { QuestionCategories, STATUS } from "@/constants";
import "./QuizCard.scss";

export const QuizCard = () => {
  const { questions, currentQuestionIndex, status, error, tryAgain } =
    useQuestions();

  const question = questions[currentQuestionIndex];

  const className = clsx("quiz-card", {
    [`quiz-card--${status}`]: status,
    "quiz-card--flag": question?.category === QuestionCategories.FlagOfCountry,
  });

  return (
    <div className={className}>
      {status === STATUS.LOADING && <Loader />}
      {status === STATUS.SUCCESS && <Quiz />}
      {status === STATUS.ERROR && <p className="error">{error?.message}</p>}
      {status === STATUS.OVER && <Results tryAgain={tryAgain} />}
    </div>
  );
};
