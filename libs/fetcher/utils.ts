export const isAbortError = ({ name }: Error) => name === "AbortError";

export const isNetworkError = ({ message }: Error) =>
  message.match(/NetworkError|Failed to fetch/i) != null;
