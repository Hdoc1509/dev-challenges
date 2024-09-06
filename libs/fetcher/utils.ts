import { ResponseError } from "./error";

export const isAbortError = ({ name }: Error) => name === "AbortError";

export const isNetworkError = ({ message }: Error) =>
  message.match(/NetworkError|Failed to fetch/i) != null;

export const is5xxError = (error: Error) =>
  error instanceof ResponseError && error.res.status >= 500;
