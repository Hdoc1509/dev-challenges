import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { isWordRemovedFromGame } from "@/utils/word-removed";
import { DIFFICULTY } from "@/consts/difficulty";

// TEST: add unit test

/** @param {any} parsedItem
 * @param {(item: import("./parse").SavedWordItem) => Promise<void>} onParsedItem */
export async function parseOldFormat(parsedItem, onParsedItem) {
  if (!Array.isArray(parsedItem)) return [];

  /** @type {Array<[string, import("@/consts/difficulty").Difficulty]>} */
  const data = [];

  for (const item of parsedItem) {
    if (typeof item === "string" && !(await isWordRemovedFromGame(item))) {
      const difficulty = getDifficultiesOfWord(item)[0];

      data.unshift([item, difficulty]);
    }
  }

  for (const [word, difficulty] of data)
    await onParsedItem({
      word,
      difficulties: [difficulty],
      completed: difficulty === DIFFICULTY.EASY,
    });
}
