import { getDifficultiesOfWord } from "./difficulty/of-word.js";
import { DIFFICULTY } from "@/consts/difficulty.js";

/** @type {Map<import("@/consts/difficulty").Difficulty, Set<string> | null>} */
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
      const cachedModuleWords = mockFiles.get(difficultyMock);

      if (cachedModuleWords == null) {
        const { default: wordsModule } = await import(
          `../consts/words/${difficultyMock}.js`
        );
        const moduleToCache = new Set(wordsModule);

        mockFiles.set(difficultyMock, moduleToCache);
        return !moduleToCache.has(word);
      }

      return !cachedModuleWords.has(word);
    }
  }

  return false;
}
