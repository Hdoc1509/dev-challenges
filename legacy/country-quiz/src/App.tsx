import { Footer } from "@lib/components/Footer";
import { QuizCard } from "./components/QuizCard";
import "./App.css";

function App() {
  return (
    <>
      <main>
        <h1>Country Quiz</h1>
        <QuizCard />
      </main>
      <Footer />
    </>
  );
}

export default App;
