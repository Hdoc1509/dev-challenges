import { useQuestionStore } from "@/store/questions";
import { clsx } from "clsx";
import { Quiz } from "./Quiz";
import { Results } from "./Results";
import { Loader } from "./Loader";
import { QuestionCategories, STATUS } from "@/constants";
import "./QuizCard.scss";

type Props = {
  tryAgain: () => void;
};

export const QuizCard = ({ tryAgain }: Props) => {
  const status = useQuestionStore((s) => s.status);
  const error = useQuestionStore((s) => s.error);
  const questions = useQuestionStore((s) => s.questions);
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);

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
