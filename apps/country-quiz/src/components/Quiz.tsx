import { useRef } from "react";
import { useQuestionStore } from "../store/questions";
import { Button } from "@hdoc/react-button";
import { QuestionCategories } from "../constants";
import { QuizOptions } from "./QuizOptions";
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
  const actionRef = useRef<HTMLElement>(null);
  const quesionRef = useRef<HTMLParagraphElement>(null);
  const flagRef = useRef<HTMLImageElement>(null);

  const handleAnswer = (answer: string) => {
    selectAnswer(quiz.id, answer);
    actionRef.current?.scrollIntoView(false);
  };

  const handleAction = () => {
    isLastQuestion ? showResults() : goNextQuestion();
    quesionRef.current?.scrollIntoView(true);
    flagRef.current?.scrollIntoView(true);
  };

  if (quiz == null) {
    return <p>Loading questions</p>;
  }

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const { category, flagUrl, question, selectedAnswer } = quiz;

  return (
    <>
      <img
        ref={flagRef}
        src={characterUrl}
        className="quiz-character"
        alt="character"
      />
      {category === QuestionCategories.FlagOfCountry && (
        <img src={flagUrl} className="quiz-flag" alt="flag" />
      )}
      <p className="quiz-question" ref={quesionRef}>
        {question}
      </p>
      <QuizOptions quiz={quiz} handleAnswer={handleAnswer} />
      {/* NOTE: Can it be move to QuizCard? */}
      <footer className="quiz-footer" ref={actionRef}>
        <p className="quiz-current-question">
          {currentQuestionIndex + 1} / {totalQuestions}
        </p>
        <Button
          className="quiz-button"
          text={isLastQuestion ? "Show results" : "Next"}
          color="warning"
          onClick={handleAction}
          disabled={selectedAnswer == null}
        />
      </footer>
    </>
  );
};
