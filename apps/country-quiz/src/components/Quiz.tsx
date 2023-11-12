import { Button } from "@hdoc/react-button";
import { clsx } from "clsx";
import { getAnswerClassName, getAnswerIconEnd } from "../utils";
import type { Question } from "../types";
import "./Quiz.scss";

type Props = Omit<Question, "category" | "id" | "hasBeenAnsweredCorrectly"> & {
  onAnswer: (answer: string) => void;
};

export const Quiz = ({
  answerOptions,
  question,
  correctAnswer,
  selectedAnswer,
  onAnswer,
}: Props) => {
  return (
    <>
      <p className="quiz-question">{question}</p>
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
            onClick={() => onAnswer(option)}
          />
        ))}
      </div>
    </>
  );
};
