import { useCallback, useEffect } from "react";
import { getQuestions } from "./services/questions";
import { useQuestionStore } from "./store/questions";
import { Footer } from "@lib/components/Footer";
import { QuizCard } from "./components/QuizCard";
import { STATUS } from "./constants";
import "./App.css";

const QUESTIONS = 10;

function App() {
  const setStatus = useQuestionStore((s) => s.setStatus);
  const setError = useQuestionStore((s) => s.setError);
  const setQuestions = useQuestionStore((s) => s.setQuestions);
  const reset = useQuestionStore((s) => s.reset);

  const loadQuestions = useCallback(async () => {
    setStatus(STATUS.LOADING);

    const [error, questions] = await getQuestions(QUESTIONS);

    if (error) {
      setError(error);
      setStatus(STATUS.ERROR);
      return;
    }

    setQuestions(questions);
    setStatus(STATUS.SUCCESS);
  }, [setError, setQuestions, setStatus]);

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
