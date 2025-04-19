import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { isWordRemovedFromGame } from "@/utils/word-removed";
import { DIFFICULTIES_ALL, DIFFICULTY } from "@/consts/difficulty";
/** @typedef {import("@/consts/difficulty").Difficulty} Difficulty */
/** @typedef {typeof DIFFICULTIES_ALL} DifficultiesAll */

// TEST: add unit test

/** @param {any} parsedItem */
export async function parseOldFormat(parsedItem) {
  if (!Array.isArray(parsedItem)) return [];

  /** @type {Array<[string, Difficulty | DifficultiesAll]>} */
  const data = [];

  for (const item of parsedItem) {
    if (typeof item === "string" && !(await isWordRemovedFromGame(item))) {
      const difficulty = getDifficultiesOfWord(item)[0];

      data.unshift([
        item,
        difficulty === DIFFICULTY.EASY ? DIFFICULTIES_ALL : difficulty,
      ]);
    }
  }

  return data;
}
