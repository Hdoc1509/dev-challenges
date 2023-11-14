import { useEffect } from "react";
import { useQuestionStore } from "./store/questions";
import { Button } from "@hdoc/react-button";
import { Footer } from "@internal/components";
import { Quiz } from "./components/Quiz";
import { QuizCard } from "./components/QuizCard";
import characterUrl from "./assets/character.svg";
import "./App.css";

function App() {
  const questions = useQuestionStore((s) => s.questions);
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);
  const getQuestions = useQuestionStore((s) => s.getQuestions);
  const selectAnswer = useQuestionStore((s) => s.selectAnswer);
  const goNextQuestion = useQuestionStore((s) => s.goNextQuestion);

  const question = questions[currentQuestionIndex];

  const onAnswer = (answer: string) => selectAnswer(question.id, answer);

  useEffect(() => void getQuestions(), [getQuestions]);

  return (
    <>
      <main>
        <h1>Country Quiz</h1>
        <QuizCard selectedAnswer={question?.selectedAnswer}>
          <img
            src={characterUrl}
            className="quiz-card__character"
            alt="character"
          />
          {question && <Quiz quiz={question} onAnswer={onAnswer} />}
          {question?.selectedAnswer && question?.hasBeenAnsweredCorrectly && (
            <Button
              className="quiz-next"
              text="Next"
              color="warning"
              onClick={goNextQuestion}
            />
          )}
        </QuizCard>
      </main>
      <Footer />
    </>
  );
}

export default App;
