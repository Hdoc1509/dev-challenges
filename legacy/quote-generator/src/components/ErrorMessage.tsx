import { NetworkError, ValidationError } from "@lib/fetcher";
import "./ErrorMessage.scss";

const IssueLink = () => (
  <a href="https://github.com/Hdoc1509/dev-challenges/issues/new">
    rise an issue on Github
  </a>
);

const AdittionalMessage = (error: Error) => {
  if (error instanceof NetworkError)
    return (
      <>
        <p>Please try again later.</p>
        <p>
          Or <IssueLink /> if the problem persists.
        </p>
      </>
    );

  if (error instanceof ValidationError)
    return (
      <p>
        This error is not intended to occur, please <IssueLink />
      </p>
    );

  return null;
};

export const ErrorMessage = ({ error }: { error: Error }) => {
  return (
    <div className="error-message">
      <p>
        <strong>{error.message}</strong>
      </p>
      {AdittionalMessage(error)}
    </div>
  );
};
