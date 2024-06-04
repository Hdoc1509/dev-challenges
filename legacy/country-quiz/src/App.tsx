import { useCallback, useEffect } from "react";
import { getQuestions } from "./services/questions";
import { useQuestionStore } from "./store/questions";
import { Footer } from "@internal/components/src/Footer";
import { QuizCard } from "./components/QuizCard";
import "./App.css";

function App() {
  const setStatus = useQuestionStore((s) => s.setStatus);
  const setQuestions = useQuestionStore((s) => s.setQuestions);
  const reset = useQuestionStore((s) => s.reset);

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
        <QuizCard tryAgain={tryAgain} />
      </main>
      <Footer />
    </>
  );
}

export default App;
