import { Button } from "@hdoc/react-button";
import winnerSVG from "../assets/winner.svg";
import "./Results.scss";

type Props = {
  tryAgain: () => void;
};

export const Results = ({ tryAgain }: Props) => {
  return (
    <>
      <img className="quiz-results-winner" src={winnerSVG} alt="winner" />
      <div>
        <h2 className="quiz-results-header">Results</h2>
        <p className="quiz-results-description">
          You got <span className="quiz-results-description__points">4</span>{" "}
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
