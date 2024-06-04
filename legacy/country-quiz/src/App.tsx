import { useCallback, useEffect } from "react";
import { getQuestions } from "./services/questions";
import { useQuestionStore } from "./store/questions";
import { Footer } from "@internal/components/src/Footer";
import { Quiz } from "./components/Quiz";
import { QuizCard } from "./components/QuizCard";
import { Results } from "./components/Results";
import "./App.css";

function App() {
  const setStatus = useQuestionStore((s) => s.setStatus);
  const questions = useQuestionStore((s) => s.questions);
  const currentQuestionIndex = useQuestionStore((s) => s.currentQuestionIndex);
  const setQuestions = useQuestionStore((s) => s.setQuestions);
  const reset = useQuestionStore((s) => s.reset);

  const question = questions[currentQuestionIndex];

  const loadQuestions = useCallback(
    (limit?: number) => {
      setStatus("loading");
      void getQuestions(limit).then((questions) => {
        setQuestions(questions);
        setStatus("success");
      });
    },
    [setQuestions, setStatus],
  );

  const tryAgain = () => {
    reset();
    void loadQuestions();
  };

  useEffect(() => void loadQuestions(), [loadQuestions]);

  return (
    <>
      <main>
        <h1>Country Quiz</h1>
        <QuizCard
          category={question?.category}
          resultsElement={<Results questions={questions} tryAgain={tryAgain} />}
        >
          <Quiz
            quiz={question}
            totalQuestions={questions.length}
            currentQuestion={currentQuestionIndex + 1}
            showResults={() => setStatus("over")}
          />
        </QuizCard>
      </main>
      <Footer />
    </>
  );
}

export default App;
