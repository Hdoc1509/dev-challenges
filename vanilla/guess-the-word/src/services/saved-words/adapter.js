import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { isWordRemovedFromGame } from "@/utils/word-removed";
import { DIFFICULTIES, DIFFICULTIES_ALL } from "@/consts/difficulty";

/** @typedef {(word: WordItem) => Promise<void>} OnWordAdapt  */

/** @typedef WordItem
 * @property {string} word
 * @property {import("@/consts/difficulty").Difficulty[]} difficulties
 * @property {boolean} completed
 */

/** @param {any} parsedItem
 * @param {OnWordAdapt} onWord */
export async function savedWordsAdapter(parsedItem, onWord) {
  if (!Array.isArray(parsedItem)) return;

  for (const item of parsedItem) {
    if (!Array.isArray(item) || item.length !== 2) continue;

    const [word, savedDifficulties] = item;

    if (typeof word !== "string") continue;

    const availableDifficulties = getDifficultiesOfWord(word);

    if (savedDifficulties === DIFFICULTIES_ALL)
      await onWord({
        word,
        difficulties: availableDifficulties,
        completed: true,
      });
    else if (
      Array.isArray(savedDifficulties) &&
      savedDifficulties.every(
        /** @returns {difficulty is import("@/consts/difficulty").Difficulty} */
        (difficulty) => DIFFICULTIES.has(difficulty),
      ) &&
      !(await isWordRemovedFromGame(word))
    )
      await onWord({
        word,
        difficulties: savedDifficulties,
        completed: availableDifficulties.length === savedDifficulties.length,
      });
  }
}
