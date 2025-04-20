import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { isWordRemovedFromGame } from "@/utils/word-removed";
import { DIFFICULTY } from "@/consts/difficulty";
/** @typedef {import("@/consts/difficulty").Difficulty} Difficulty */
/** @typedef {import("./parse").SavedWordItem} SavedWordItem */

// TEST: add unit test

/** @param {any} parsedItem
 * @param {(item: SavedWordItem) => void} onParsedItem */
export async function parseOldFormat(parsedItem, onParsedItem) {
  if (!Array.isArray(parsedItem)) return [];

  /** @type {Array<[string, Difficulty]>} */
  const data = [];

  for (const item of parsedItem) {
    if (typeof item === "string" && !(await isWordRemovedFromGame(item))) {
      const difficulty = getDifficultiesOfWord(item)[0];

      data.unshift([item, difficulty]);
    }
  }

  data.forEach(([word, difficulty]) =>
    onParsedItem({
      word,
      difficulties: [difficulty],
      completed: difficulty === DIFFICULTY.EASY,
    }),
  );
}
