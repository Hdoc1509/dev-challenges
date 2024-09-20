import { useQuestionStore } from "@/store/questions";
import { getAnswerData } from "./Quiz.utils";
import { Button } from "@hrc/button";
import { Icon } from "@hrc/material-icons";
import type { Question } from "@/types";

type OptionProps = {
  option: string;
  onAnswer: () => void;
} & Pick<Question, "selectedAnswer" | "correctAnswer">;

const Option = ({
  option,
  selectedAnswer,
  correctAnswer,
  onAnswer,
}: OptionProps) => {
  const { icon, className } =
    getAnswerData({ option, selectedAnswer, correctAnswer }) ?? {};

  return (
    <Button
      className={className}
      variant="outline"
      iconEnd={icon && <Icon name={icon} variant="outlined" />}
      disabled={selectedAnswer != null}
      onClick={onAnswer}
    >
      {option}
    </Button>
  );
};

type Props = {
  quiz: Question;
};

export const QuizOptions = ({ quiz }: Props) => {
  const selectAnswer = useQuestionStore((s) => s.selectAnswer);

  const { answerOptions, selectedAnswer, correctAnswer } = quiz;

  const handleAnswer = (answer: string) => {
    selectAnswer(quiz.id, answer);
  };

  return (
    <div className="quiz-answers">
      {answerOptions.map((option) => (
        <Option
          key={option}
          option={option}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          onAnswer={() => handleAnswer(option)}
        />
      ))}
    </div>
  );
};
