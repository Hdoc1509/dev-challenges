import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { isWordRemovedFromGame } from "@/utils/word-removed";
import { DIFFICULTIES, DIFFICULTIES_ALL } from "@/consts/difficulty";
/** @typedef {typeof DIFFICULTIES_ALL} DifficultiesAll */

// TODO: create SavedWordParser function type

/** @typedef SavedWordItem
 * @property {string} word
 * @property {import("@/consts/difficulty").Difficulty[]} difficulties
 * @property {boolean} completed
 */

/**
 * @param {any} parsedItem
 * @param {(item: SavedWordItem) => void} onParsedItem
 */
export async function parseSavedWords(parsedItem, onParsedItem) {
  if (!Array.isArray(parsedItem)) return;

  for (const item of parsedItem) {
    if (!Array.isArray(item) || item.length !== 2) continue;

    const [word, savedDifficulties] = item;

    if (typeof word !== "string") continue;

    const availableDifficulties = getDifficultiesOfWord(word);

    if (savedDifficulties === DIFFICULTIES_ALL)
      onParsedItem({
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
      onParsedItem({
        word,
        difficulties: savedDifficulties,
        completed: availableDifficulties.length === savedDifficulties.length,
      });
  }
}
