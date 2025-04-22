import { getDifficultiesOfWord } from "./difficulty/of-word.js";
import { DIFFICULTY } from "@/consts/difficulty.js";

/** @type {Map<import("@/consts/difficulty").DifficultyGroup, Set<string> | null>} */
const mockFiles = new Map([
  [DIFFICULTY.EASY, null],
  [DIFFICULTY.NORMAL, null],
  [DIFFICULTY.EXTREME, null],
  [DIFFICULTY.WHY, null],
]);

/** @param {string} word */
export async function isWordRemovedFromGame(word) {
  const difficulties = getDifficultiesOfWord(word);

  for (const difficultyMock of mockFiles.keys()) {
    if (difficulties.includes(difficultyMock)) {
      const words = mockFiles.get(difficultyMock);

      if (words == null) {
        const { default: loadedWords } = await import(
          `../consts/words/by-difficulty/${difficultyMock}.js`
        );
        const wordsToLoad = new Set(loadedWords);

        mockFiles.set(difficultyMock, wordsToLoad);
        return !wordsToLoad.has(word);
      }

      return !words.has(word);
    }
  }

  return false;
}
