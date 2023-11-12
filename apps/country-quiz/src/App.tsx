import { useEffect } from "react";
import { useQuestionStore } from "./store/questions";
import { Button } from "@hdoc/react-button";
import { Footer } from "@internal/components";
import { Quiz } from "./components/Quiz";
import characterUrl from "./assets/character.svg";
import "./App.css";

function App() {
  const questions = useQuestionStore((s) => s.questions);
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);
  const getQuestions = useQuestionStore((s) => s.getQuestions);
  const selectAnswer = useQuestionStore((s) => s.selectAnswer);

  const question = questions[currentQuestionIndex];

  const onAnswer = (answer: string) => selectAnswer(question.id, answer);

  useEffect(() => void getQuestions(), [getQuestions]);

  return (
    <>
      <main>
        <h1>Country Quiz</h1>
        <div className="quiz-container" data-answer={question?.selectedAnswer}>
          <img
            src={characterUrl}
            className="quiz-container__character"
            alt="character"
          />
          {question && (
            <Quiz
              question={question.question}
              correctAnswer={question.correctAnswer}
              answerOptions={question.answerOptions}
              selectedAnswer={question.selectedAnswer}
              onAnswer={onAnswer}
            />
          )}
          {question?.selectedAnswer && (
            <Button className="quiz-next" text="Next" color="warning" />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
