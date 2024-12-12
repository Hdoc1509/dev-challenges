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
