/**
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
export const randomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];
