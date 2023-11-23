import { clsx } from "clsx";
import { getAnswerClassName, getAnswerIconEnd } from "./Quiz.utils";
import { Button } from "@hdoc/react-button";
import type { Question } from "../types";

type Props = {
  quiz: Question;
  handleAnswer: (answer: string) => void;
};

export const QuizOptions = ({ quiz, handleAnswer }: Props) => {
  const { answerOptions, selectedAnswer, correctAnswer } = quiz;

  return (
    <div className="quiz-answers">
      {answerOptions.map((option) => (
        <Button
          key={option}
          className={clsx(
            "quiz-answers__option",
            getAnswerClassName({ option, selectedAnswer, correctAnswer }),
          )}
          variant="outline"
          text={option}
          iconEnd={getAnswerIconEnd({
            option,
            selectedAnswer,
            correctAnswer,
          })}
          iconVariant="outlined"
          disabled={selectedAnswer != null}
          onClick={() => handleAnswer(option)}
        />
      ))}
    </div>
  );
};
