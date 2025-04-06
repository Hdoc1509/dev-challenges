/** @type {readonly string[]} */
export let words = [];

/** @param {readonly string[]} newWords */
export const setWords = (newWords) => (words = newWords);
