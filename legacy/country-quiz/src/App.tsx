import { useQuestions } from "./hooks/useQuestions";
import { Footer } from "@lib/components/Footer";
import { QuizCard } from "./components/QuizCard";
import "./App.css";

function App() {
  const { tryAgain } = useQuestions();

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
