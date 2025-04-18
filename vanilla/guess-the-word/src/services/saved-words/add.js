import { discoveredWords } from "@/state/discovered-words";
import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";
import { DISCOVERED_WORDS } from "@/consts/discovered-words";
/** @typedef {import("@/consts/difficulty").Difficulty} Difficulty */

/**
 * @param {string} word
 * @param {{ difficulty: Difficulty }} extraParams
 */
export const addDiscoveredWord = (word, { difficulty }) => {
  const availableDifficulties = getDifficultiesOfWord(word);

  if (!availableDifficulties.includes(difficulty)) return;

  const savedDifficulties = discoveredWords.get(word);

  if (savedDifficulties === DIFFICULTIES_ALL) return;

  const difficulties = new Set(savedDifficulties ?? [difficulty]).add(
    difficulty,
  );

  if (difficulties.size === savedDifficulties?.length) return;

  discoveredWords.set(
    word,
    difficulties.size === availableDifficulties.length
      ? DIFFICULTIES_ALL
      : Array.from(difficulties),
  );

  const data = Array.from(discoveredWords);

  localStorage.setItem(
    DISCOVERED_WORDS.LOCAL_STORAGE_KEY,
    JSON.stringify(data),
  );
};
