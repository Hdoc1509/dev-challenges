import { useEffect } from "react";
import { useQuestionStore } from "./store/questions";
import { Footer } from "@internal/components";
import { Quiz } from "./components/Quiz";
import { QuizCard } from "./components/QuizCard";
import "./App.css";

function App() {
  const questions = useQuestionStore((s) => s.questions);
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);
  const getQuestions = useQuestionStore((s) => s.getQuestions);

  const question = questions[currentQuestionIndex];

  useEffect(() => void getQuestions(), [getQuestions]);

  return (
    <>
      <main>
        <h1>Country Quiz</h1>
        <QuizCard selectedAnswer={question?.selectedAnswer}>
          {question && <Quiz quiz={question} />}
        </QuizCard>
      </main>
      <Footer />
    </>
  );
}

export default App;
