import { useQuestionStore } from "../store/questions";
import { Button } from "@hrc/button/dist/Button";
import { QuestionCategories } from "../constants";
import { QuizOptions } from "./QuizOptions";
import characterUrl from "/character.svg";
import "./Quiz.scss";

export const Quiz = () => {
  const questions = useQuestionStore((s) => s.questions);
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);
  const goNextQuestion = useQuestionStore((s) => s.goNextQuestion);
  const setStatus = useQuestionStore((s) => s.setStatus);

  const quiz = questions[currentQuestionIndex];
  const currentQuestion = currentQuestionIndex + 1;
  const total = questions.length;

  const isLastQuestion = currentQuestion === total;
  const { category, flagUrl, question, selectedAnswer } = quiz;

  const handleAction = () => {
    isLastQuestion ? setStatus("over") : goNextQuestion();
  };

  return (
    <>
      <img src={characterUrl} className="quiz-character" alt="character" />
      {category === QuestionCategories.FlagOfCountry && (
        <img src={flagUrl} className="quiz-flag" alt="flag" />
      )}
      <p className="quiz-question">{question}</p>
      <QuizOptions quiz={quiz} />
      {/* NOTE: Can it be moved to QuizCard? */}
      <footer className="quiz-footer">
        <p className="quiz-current-question">
          {currentQuestion} / {total}
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
