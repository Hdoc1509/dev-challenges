import { clsx } from "clsx";
import { getAnswerClassName, getAnswerIconEnd } from "./Quiz.utils";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import type { Question } from "../types";

type Props = {
  quiz: Question;
  handleAnswer: (answer: string) => void;
};

export const QuizOptions = ({ quiz, handleAnswer }: Props) => {
  const { answerOptions, selectedAnswer, correctAnswer } = quiz;

  return (
    <div className="quiz-answers">
      {answerOptions.map((option) => {
        const icon = getAnswerIconEnd({
          option,
          selectedAnswer,
          correctAnswer,
        });

        return (
          <Button
            key={option}
            className={clsx(
              "quiz-answers__option",
              getAnswerClassName({ option, selectedAnswer, correctAnswer }),
            )}
            variant="outline"
            iconEnd={icon && <Icon name={icon} variant="outlined" />}
            disabled={selectedAnswer != null}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};
