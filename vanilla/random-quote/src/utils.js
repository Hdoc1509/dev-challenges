import { $quote } from "./ui/quote/elements";

/**
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
export const randomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

/**
 * Returns a random integer between `min` (inclusive) and `max` (inclusive)
 * @param {number} min
 * @param {number} max
 */
export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/** @param {import("@lib/fetcher").Status} status */
export const setFetchingStatus = (status) =>
  $quote.setAttribute("data-status", status);

/** @param {unknown} error */
const isNotAllowedError = (error) =>
  error instanceof DOMException && error.name === "NotAllowedError";

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
