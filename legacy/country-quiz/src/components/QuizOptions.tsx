import { clsx } from "clsx";
import { getAnswerData } from "./Quiz.utils";
import { Button } from "@hrc/button/dist/Button";
import { Icon } from "@hrc/material-icons";
import type { Question } from "../types";

type OptionProps = {
  option: string;
  onAnswer: () => void;
} & Pick<Question, "selectedAnswer" | "correctAnswer">;

const Option = ({
  option,
  selectedAnswer,
  correctAnswer,
  onAnswer,
}: OptionProps) => {
  const { icon, className } =
    getAnswerData({ option, selectedAnswer, correctAnswer }) ?? {};

  return (
    <Button
      className={clsx("quiz-answers__option", className)}
      variant="outline"
      iconEnd={icon && <Icon name={icon} variant="outlined" />}
      disabled={selectedAnswer != null}
      onClick={onAnswer}
    >
      {option}
    </Button>
  );
};

type Props = {
  quiz: Question;
  handleAnswer: (answer: string) => void;
};

export const QuizOptions = ({ quiz, handleAnswer }: Props) => {
  const { answerOptions, selectedAnswer, correctAnswer } = quiz;

  return (
    <div className="quiz-answers">
      {answerOptions.map((option) => (
        <Option
          key={option}
          option={option}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          onAnswer={() => handleAnswer(option)}
        />
      ))}
    </div>
  );
};
