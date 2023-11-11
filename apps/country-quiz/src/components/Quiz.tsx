import { Button } from "@hdoc/react-button";
import "./Quiz.scss";

type Props = {
  answerOptions: string[];
  question: string;
  onAnswer: (answer: string) => void;
  correctAnswer: string;
};

export const Quiz = ({
  answerOptions,
  question,
  onAnswer,
  correctAnswer,
}: Props) => {
  return (
    <>
      <p className="quiz-question">{question}</p>
      <div className="quiz-answers">
        {answerOptions.map((option) => (
          <Button
            key={option}
            className="quiz-answers__option"
            variant="outline"
            text={option}
            iconEnd="check_circle"
            iconVariant="outlined"
            onClick={() => onAnswer(option)}
          />
        ))}
      </div>
    </>
  );
};
