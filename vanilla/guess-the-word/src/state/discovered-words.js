import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { DIFFICULTIES } from "@/consts/difficulty";

const LOCAL_STORAGE_KEY = "discovered-words";

/** @type {string[]} */
const wordsToSave = [];

export const discoveredWords = (() => {
  /** @type {Map<string, Set<string>>} */
  const wordsMap = new Map();
  const savedWords = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedWords = JSON.parse(savedWords ?? "[]");

  if (!Array.isArray(parsedWords)) return wordsMap;

  for (const item of parsedWords) {
    if (typeof item === "string") {
      const difficulty = getDifficultiesOfWord(item)[0];

      wordsMap.set(item, new Set([difficulty]));
      wordsToSave.push(item);
    } else if (Array.isArray(item)) {
      if (item.length !== 2) continue;

      const [word, difficulties] = item;

      if (
        typeof word !== "string" ||
        !Array.isArray(difficulties) ||
        !difficulties.every((difficulty) => DIFFICULTIES.has(difficulty))
      )
        continue;

      wordsMap.set(word, new Set(difficulties));
      wordsToSave.push(word);
    }
  }

  return wordsMap;
})();

/**
 * @param {string} word
 * @param {{ difficulty: import("@/consts/difficulty").Difficulty }} extraParams
 */
export const addDiscoveredWord = (word, { difficulty }) => {
  if (!getDifficultiesOfWord(word).includes(difficulty)) return;

  const savedWordDifficulties = discoveredWords.get(word);
  const difficulties = new Set(savedWordDifficulties ?? [difficulty]).add(
    difficulty,
  );

  if (difficulties.size === savedWordDifficulties?.size) return;

  discoveredWords.set(word, difficulties);
  if (savedWordDifficulties == null) wordsToSave.unshift(word);

  // NOTE: can this be really slow when discovered words reach 1k+?
  // if yes, then I should use:
  // - IndexedDB or
  // - some kind of free storage service, will require some auth logic
  const data = wordsToSave.map((word) => [
    word,
    Array.from(/** @type {Set<string>} */ (discoveredWords.get(word))),
  ]);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};
