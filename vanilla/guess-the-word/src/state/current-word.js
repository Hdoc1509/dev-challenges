import { IS_DEV } from "@/config";

export let currentWord = "";

/** @param {string} newWord */
export const setCurrentWord = (newWord) => {
  currentWord = newWord;
  if (IS_DEV) console.log({ currentWord });
};
