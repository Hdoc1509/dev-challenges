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

  const question = questions[currentQuestionIndex];

  const tryAgain = () => {
    setIsQuizOver(false);
    void getQuestions();
  };

  useEffect(() => void getQuestions(), [getQuestions]);

  return (
    <>
      <main>
        <h1>Country Quiz</h1>
        <QuizCard
          isAnswered={question?.selectedAnswer != null}
          isOver={isQuizOver}
        >
          {!isQuizOver ? (
            <Quiz quiz={question} showResults={() => setIsQuizOver(true)} />
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
