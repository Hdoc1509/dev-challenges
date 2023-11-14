import { clsx } from "clsx";
import { useQuestionStore } from "../store/questions";
import { getAnswerClassName, getAnswerIconEnd } from "../utils";
import { Button } from "@hdoc/react-button";
import type { Question } from "../types";
import characterUrl from "../assets/character.svg";
import "./Quiz.scss";

type Props = {
  quiz: Question;
  onAnswer: (answer: string) => void;
};

export const Quiz = ({ quiz, onAnswer }: Props) => {
  const goNextQuestion = useQuestionStore((s) => s.goNextQuestion);

  const {
    category,
    flagUrl,
    question,
    answerOptions,
    selectedAnswer,
    correctAnswer,
    hasBeenAnsweredCorrectly,
  } = quiz;

  return (
    <>
      <img src={characterUrl} className="quiz-character" alt="character" />
      {category === "flagOfCountry" && (
        <img src={flagUrl} className="quiz-flag" alt="flag" />
      )}
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
      {hasBeenAnsweredCorrectly && (
        <Button
          className="quiz-next"
          text="Next"
          color="warning"
          onClick={goNextQuestion}
        />
      )}
    </>
  );
};
