import { useEffect, useState } from "react";
import { useQuestionStore } from "./store/questions";
import { Footer } from "@internal/components";
import { Quiz } from "./components/Quiz";
import { QuizCard } from "./components/QuizCard";
import { Results } from "./components/Results";
import "./App.css";

function App() {
  const [isQuizOver, setIsQuizOver] = useState(false);
  const questions = useQuestionStore((s) => s.questions);
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);
  const getQuestions = useQuestionStore((s) => s.getQuestions);
  const reset = useQuestionStore((s) => s.reset);

  const question = questions[currentQuestionIndex];

  const tryAgain = () => {
    reset();
    setIsQuizOver(false);
    void getQuestions();
  };

  useEffect(() => void getQuestions(), [getQuestions]);

  return (
    <>
      <main>
        <h1>Country Quiz</h1>
        <QuizCard isOver={isQuizOver} category={question?.category}>
          {!isQuizOver ? (
            <Quiz
              quiz={question}
              totalQuestions={questions.length}
              currentQuestionIndex={currentQuestionIndex}
              showResults={() => setIsQuizOver(true)}
            />
          ) : (
            <Results tryAgain={tryAgain} />
          )}
        </QuizCard>
      </main>
      <Footer />
    </>
  );
}

export default App;
