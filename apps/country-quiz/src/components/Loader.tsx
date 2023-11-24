import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="quiz-loader">
      <div className="loader-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Generating questions...</p>
    </div>
  );
};
