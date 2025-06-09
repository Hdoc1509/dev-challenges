import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { isWordRemovedFromGame } from "@/utils/word-removed";
import { DIFFICULTIES, DIFFICULTIES_ALL } from "@/consts/difficulty";

/** @typedef {(item: SavedWordItem) => Promise<void>} SavedWordParser  */

/** @typedef SavedWordItem
 * @property {string} word
 * @property {import("@/consts/difficulty").Difficulty[]} difficulties
 * @property {boolean} completed
 */

/** @param {any} parsedItem
 * @param {SavedWordParser} onParsedItem */
export async function parseSavedWords(parsedItem, onParsedItem) {
  if (!Array.isArray(parsedItem)) return;

  for (const item of parsedItem) {
    if (!Array.isArray(item) || item.length !== 2) continue;

    const [word, savedDifficulties] = item;

    if (typeof word !== "string") continue;

    const availableDifficulties = getDifficultiesOfWord(word);

    if (savedDifficulties === DIFFICULTIES_ALL)
      await onParsedItem({
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
      await onParsedItem({
        word,
        difficulties: savedDifficulties,
        completed: availableDifficulties.length === savedDifficulties.length,
      });
  }
}
