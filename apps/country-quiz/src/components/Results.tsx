import { getResultMessage } from "../utils/helpers";
import { Button } from "@hdoc/react-button";
import winnerSVG from "../assets/winner.svg";
import type { Question } from "../types";
import "./Results.scss";

type Props = {
  questions: Question[];
  tryAgain: () => void;
};

export const Results = ({ questions, tryAgain }: Props) => {
  const correct = questions.filter((q) => q.hasBeenAnsweredCorrectly).length;

  return (
    <>
      <img className="quiz-results-winner" src={winnerSVG} alt="winner" />
      <div>
        <h2 className="quiz-results-header">
          {getResultMessage({ correct, total: questions.length })}
        </h2>
        <p className="quiz-results-description">
          You got
          <span className="quiz-results-description__points">
            {` ${correct} `}
          </span>
          correct answers
        </p>
      </div>
      <Button
        className="quiz-results-try-again"
        text="Try again"
        variant="outline"
        onClick={tryAgain}
      />
    </>
  );
};
