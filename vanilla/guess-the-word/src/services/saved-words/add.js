import { discoveredWords } from "@/state/discovered-words";
import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";
import { DISCOVERED_WORDS } from "@/consts/discovered-words";

/** @param {string} word
 * @param {{ difficulty: import("@/consts/difficulty").Difficulty }} config
 * @returns {{ completed: boolean }} */
export const addDiscoveredWord = (word, { difficulty }) => {
  const availableDifficulties = getDifficultiesOfWord(word);

  if (!availableDifficulties.includes(difficulty)) return { completed: false };

  const savedDifficulties = discoveredWords.get(word);

  if (savedDifficulties === DIFFICULTIES_ALL) return { completed: true };

  const difficulties = new Set(savedDifficulties ?? [difficulty]).add(
    difficulty,
  );

  if (difficulties.size === savedDifficulties?.length)
    return { completed: false };

  const isCompleted = difficulties.size === availableDifficulties.length;

  discoveredWords.set(
    word,
    isCompleted ? DIFFICULTIES_ALL : Array.from(difficulties),
  );

  const data = Array.from(discoveredWords);

  localStorage.setItem(
    DISCOVERED_WORDS.LOCAL_STORAGE_KEY,
    JSON.stringify(data),
  );
  return { completed: isCompleted };
};
