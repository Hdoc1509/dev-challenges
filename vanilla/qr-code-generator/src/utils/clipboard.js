import { isNotAllowedError } from "./error";

/**
 * @param {string} text
 * @returns {Promise<Error | void>}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch (error) {
    if (isNotAllowedError(error))
      return new Error("Clipboard Error: Access not allowed.");
  }

  return new Error("Clipboard Error: An unknown error occurred. Try again.");
};
