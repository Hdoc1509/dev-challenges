import "./ErrorMessage.scss";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="error-message">
      <p>
        <strong>Error: {message}</strong>
      </p>
      <p>Please try again later.</p>
      <p>
        Or contact me at{" "}
        <a href="mailto:hector.ochoa.dev@gmail.com">
          hector.ochoa.dev@gmail.com
        </a>{" "}
      </p>
      <p>
        Or{" "}
        <a href="https://github.com/Hdoc1509/dev-challenges/issues/new">
          rise an issue on Github
        </a>{" "}
      </p>
    </div>
  );
};
