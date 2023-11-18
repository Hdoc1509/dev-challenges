import { clsx } from "clsx";
import { useQuestionStore } from "../store/questions";
import { getAnswerClassName, getAnswerIconEnd } from "./Quiz.utils";
import { QuestionCategories } from "../utils";
import { Button } from "@hdoc/react-button";
import type { Question } from "../types";
import characterUrl from "../assets/character.svg";
import "./Quiz.scss";

type Props = {
  quiz: Question;
  showResults: () => void;
};

export const Quiz = ({ quiz, showResults }: Props) => {
  const goNextQuestion = useQuestionStore((s) => s.goNextQuestion);
  const selectAnswer = useQuestionStore((s) => s.selectAnswer);

  const handleAnswer = (answer: string) => {
    selectAnswer(quiz.id, answer);
    window.scrollTo({ top: document.documentElement.scrollHeight });
  };

  if (quiz == null) {
    return <p>Loading questions</p>;
  }

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
      {category === QuestionCategories.FlagOfCountry && (
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
            onClick={() => handleAnswer(option)}
          />
        ))}
      </div>
      {/* TODO: Show current / total questions */}
      {/* TODO: Always show next button */}
      {hasBeenAnsweredCorrectly && (
        <Button
          className="quiz-button quiz-button--next"
          text="Next"
          color="warning"
          onClick={goNextQuestion}
        />
      )}
      {/* TODO: Show results button when quiz is over, i.e. there are no more questions */}
      {hasBeenAnsweredCorrectly === false && (
        <Button
          className="quiz-button quiz-button--end"
          text="Show results"
          color="warning"
          onClick={showResults}
        />
      )}
    </>
  );
};
