import { Button } from "@hdoc/react-button";
import { Footer } from "@internal/components";
import { Quiz } from "./components/Quiz";
import { QUESTION } from "./utils";
import characterUrl from "./assets/character.svg";
import "./App.css";

const answerOptions = ["Vietnam", "Malaysia", "Sweden", "Austria"];

function App() {
  const question =
    Math.random() > 0.5
      ? QUESTION.countryOfCapital("Kuala Lumpur")
      : QUESTION.flagOfCountry();

  const onAnswer = (answer: string) => {
    console.log({ answer });
  };

  return (
    <>
      <main>
        <h1>Country Quiz</h1>
        <div className="quiz-container">
          <img
            src={characterUrl}
            className="quiz-container__character"
            alt="character"
          />
          <Quiz
            question={question}
            correctAnswer="Malaysia"
            answerOptions={answerOptions}
            onAnswer={onAnswer}
          />
          <Button className="quiz-next" text="Next" color="warning" />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
