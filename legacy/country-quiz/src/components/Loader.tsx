import { RingSpinner } from "@hrc/spinner";
import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loader">
      <RingSpinner />
      <p>Generating questions...</p>
    </div>
  );
};
