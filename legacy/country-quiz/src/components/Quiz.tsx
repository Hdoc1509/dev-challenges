import { useQuestionStore } from "@/store/questions";
import { Button } from "@hrc/button";
import { QuestionCategories } from "@/constants";
import { QuizOptions } from "./QuizOptions";
import characterUrl from "/character.svg";
import type { Question } from "@/types";
import "./Quiz.scss";

export const Quiz = ({ questions }: { questions: Question[] }) => {
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);
  const setQuestionsOver = useQuestionStore((s) => s.setQuestionsOver);
  const goNextQuestion = useQuestionStore((s) => s.goNextQuestion);

  const quiz = questions[currentQuestionIndex];
  const currentQuestion = currentQuestionIndex + 1;
  const total = questions.length;

  const isLastQuestion = currentQuestion === total;
  const { category, flagUrl, question, selectedAnswer } = quiz;

  const handleAction = () =>
    isLastQuestion ? setQuestionsOver() : goNextQuestion();

  return (
    <>
      <img src={characterUrl} className="character" alt="character" />
      {category === QuestionCategories.FlagOfCountry && (
        <img src={flagUrl} className="flag" alt="flag" />
      )}
      <p className="question">{question}</p>
      <QuizOptions quiz={quiz} />
      {/* NOTE: Can it be moved to QuizCard? */}
      <footer className="quiz-footer">
        <p className="current-question">
          {currentQuestion} / {total}
        </p>
        <Button
          className="action"
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
