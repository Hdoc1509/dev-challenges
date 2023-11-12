import { useState } from "react";
import { Button } from "@hdoc/react-button";
import { Footer } from "@internal/components";
import { Quiz } from "./components/Quiz";
import { QUESTION } from "./utils";
import type { Question } from "./types";
import characterUrl from "./assets/character.svg";
import "./App.css";

function App() {
  const [question, setQuestion] = useState<Question>({
    id: 1,
    category: "countryOfCapital",
    question:
      Math.random() > 0.5
        ? QUESTION.countryOfCapital("Kuala Lumpur")
        : QUESTION.flagOfCountry(),
    correctAnswer: "Malaysia",
    answerOptions: ["Vietnam", "Malaysia", "Sweden", "Austria"],
    selectedAnswer: null,
    hasBeenAnsweredCorrectly: null,
  });

  const onAnswer = (answer: string) => {
    console.log({ answer });
    setQuestion({
      ...question,
      selectedAnswer: answer,
      hasBeenAnsweredCorrectly: answer === question.correctAnswer,
    });
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
            question={question.question}
            correctAnswer={question.correctAnswer}
            answerOptions={question.answerOptions}
            selectedAnswer={question.selectedAnswer}
            onAnswer={onAnswer}
          />
          {question.selectedAnswer && (
            <Button className="quiz-next" text="Next" color="warning" />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
