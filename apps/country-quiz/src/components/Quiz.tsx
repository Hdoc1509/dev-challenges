import { clsx } from "clsx";
import { useQuestionStore } from "../store/questions";
import { getAnswerClassName, getAnswerIconEnd } from "./Quiz.utils";
import { QuestionCategories } from "../constants";
import { Button } from "@hdoc/react-button";
import type { Question } from "../types";
import characterUrl from "../assets/character.svg";
import "./Quiz.scss";

type Props = {
  quiz: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  showResults: () => void;
};

export const Quiz = ({
  quiz,
  currentQuestionIndex,
  totalQuestions,
  showResults,
}: Props) => {
  const goNextQuestion = useQuestionStore((s) => s.goNextQuestion);
  const selectAnswer = useQuestionStore((s) => s.selectAnswer);

  const handleAnswer = (answer: string) => {
    selectAnswer(quiz.id, answer);
    window.scrollTo({ top: document.documentElement.scrollHeight });
  };

  if (quiz == null) {
    return <p>Loading questions</p>;
  }

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const {
    category,
    flagUrl,
    question,
    answerOptions,
    selectedAnswer,
    correctAnswer,
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
      {/* NOTE: Can it be move to QuizCard? */}
      <footer className="quiz-footer">
        <p className="quiz-current-question">
          {currentQuestionIndex + 1} / {totalQuestions}
        </p>
        <Button
          className="quiz-button"
          text={isLastQuestion ? "Show results" : "Next"}
          color="warning"
          onClick={isLastQuestion ? showResults : goNextQuestion}
          disabled={selectedAnswer == null}
        />
      </footer>
    </>
  );
};
