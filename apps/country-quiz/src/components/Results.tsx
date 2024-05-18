import { getResultMessage } from "../utils/helpers";
import { Button } from "@hrc/button/dist/Button";
import type { Question } from "../types";
import winnerUrl from "/winner.svg";
import "./Results.scss";

type Props = {
  questions: Question[];
  tryAgain: () => void;
};

export const Results = ({ questions, tryAgain }: Props) => {
  const correct = questions.filter((q) => q.hasBeenAnsweredCorrectly).length;

  return (
    <>
      <img className="quiz-results-winner" src={winnerUrl} alt="winner" />
      <div className="quiz-results-message">
        <h2>{getResultMessage({ correct, total: questions.length })}</h2>
        <p className="quiz-results-points">
          You got
          <span className="quiz-results-points__correct">{` ${correct} `}</span>
          correct answers
        </p>
      </div>
      <Button
        className="quiz-results-try-again"
        variant="outline"
        onClick={tryAgain}
      >
        Try again
      </Button>
    </>
  );
};
