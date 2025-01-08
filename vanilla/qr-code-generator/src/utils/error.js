/** @param {unknown} error */
export const isNotAllowedError = (error) =>
  error instanceof DOMException && error.name === "NotAllowedError";
