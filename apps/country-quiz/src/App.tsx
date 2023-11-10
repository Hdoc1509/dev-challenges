import { Button } from "@hdoc/react-button";
import { Footer } from "@internal/components";
import characterUrl from "./assets/character.svg";
import "./App.css";

const answerOptions = ["Vietnam", "Malaysia", "Sweden", "Austria"];

function App() {
  return (
    <>
      <main>
        <h1>Country Quiz</h1>
        <div className="quiz-container">
          <img src={characterUrl} className="quiz-container__character" alt="character" />
          <p className="quiz-question">Kuala Lumpur is the capital of...</p>
          <div className="quiz-answers">
            {answerOptions.map((option) => (
              <Button
                key={option}
                className="quiz-answers__option"
                variant="outline"
                text={option}
              />
            ))}
          </div>
          <Button className="quiz-next" text="Next" color="warning" />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
