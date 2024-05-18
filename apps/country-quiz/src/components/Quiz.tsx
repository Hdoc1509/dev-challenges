import { useQuestionStore } from "../store/questions";
import { Button } from "@hrc/button/dist/Button";
import { QuestionCategories } from "../constants";
import { QuizOptions } from "./QuizOptions";
import type { Question } from "../types";
import characterUrl from "/character.svg";
import "./Quiz.scss";

type Props = {
  quiz: Question;
  currentQuestion: number;
  totalQuestions: number;
  showResults: () => void;
};

export const Quiz = ({
  quiz,
  currentQuestion,
  totalQuestions,
  showResults,
}: Props) => {
  const goNextQuestion = useQuestionStore((s) => s.goNextQuestion);
  const selectAnswer = useQuestionStore((s) => s.selectAnswer);

  const isLastQuestion = currentQuestion === totalQuestions;
  const { category, flagUrl, question, selectedAnswer } = quiz;

  const handleAnswer = (answer: string) => {
    selectAnswer(quiz.id, answer);
  };

  const handleAction = () => {
    isLastQuestion ? showResults() : goNextQuestion();
  };

  return (
    <>
      <img src={characterUrl} className="quiz-character" alt="character" />
      {category === QuestionCategories.FlagOfCountry && (
        <img src={flagUrl} className="quiz-flag" alt="flag" />
      )}
      <p className="quiz-question">{question}</p>
      <QuizOptions quiz={quiz} handleAnswer={handleAnswer} />
      {/* NOTE: Can it be moved to QuizCard? */}
      <footer className="quiz-footer">
        <p className="quiz-current-question">
          {currentQuestion} / {totalQuestions}
        </p>
        <Button
          className="quiz-button"
          color="warning"
          onClick={handleAction}
          disabled={selectedAnswer == null}
        >
          {isLastQuestion ? "Show results" : "Next"}
        </Button>
      </footer>
    </>
  );
};
