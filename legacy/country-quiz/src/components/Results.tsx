import { useQuestionStore } from "@/store/questions";
import { getResultMessage } from "@/utils/helpers";
import { Button } from "@hrc/button";
import winnerUrl from "/winner.svg";
import type { Question } from "@/types";
import "./Results.scss";

export const Results = ({ questions }: { questions: Question[] }) => {
  const tryAgain = useQuestionStore((s) => s.tryAgain);

  const correct = questions.filter((q) => q.hasBeenAnsweredCorrectly).length;

  return (
    <>
      <img className="winner" src={winnerUrl} alt="winner" />
      <div className="results-message">
        <h2>{getResultMessage({ correct, total: questions.length })}</h2>
        <p className="results-points">
          You got
          <span className="results-points__correct">{` ${correct} `}</span>
          correct answers
        </p>
      </div>
      <Button className="try-again" variant="outline" onClick={tryAgain}>
        Try again
      </Button>
    </>
  );
};
