import {
  useQuestionStore,
  useQuestionFetchingSelector,
} from "@/store/questions";
import { clsx } from "clsx";
import { Quiz } from "./Quiz";
import { Results } from "./Results";
import { Loader } from "./Loader";
import { QuestionCategories, STATUS } from "@/constants";
import "./QuizCard.scss";

export const QuizCard = () => {
  const { status, error, questions } = useQuestionFetchingSelector();
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);

  const question = questions?.[currentQuestionIndex];

  const className = clsx("quiz-card", {
    [`quiz-card--${status}`]: status,
    "quiz-card--flag": question?.category === QuestionCategories.FlagOfCountry,
  });

  return (
    <div className={className}>
      {status === STATUS.LOADING && <Loader />}
      {status === STATUS.SUCCESS && <Quiz questions={questions} />}
      {status === STATUS.ERROR && <p className="error">{error.message}</p>}
      {status === STATUS.OVER && <Results questions={questions} />}
    </div>
  );
};
