import { IS_DEV } from "@/config";
/** @typedef {import("@/consts/definitions").DefinitionWord} DefinitionWord */

export let currentWord = /** @type {DefinitionWord} */ ("");

/** @param {DefinitionWord} newWord */
export const setCurrentWord = (newWord) => {
  currentWord = newWord;
  if (IS_DEV) console.log({ currentWord });
};
