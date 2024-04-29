import { RingSpinner } from "@hrc/spinner";
import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="quiz-loader">
      <RingSpinner />
      <p>Generating questions...</p>
    </div>
  );
};
