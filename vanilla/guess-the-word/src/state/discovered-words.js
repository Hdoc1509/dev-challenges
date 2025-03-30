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

/** @param {string} word */
export const addDiscoveredWord = (word) => {
  discoveredWords.add(word);
  wordsToSave.unshift(word);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wordsToSave));
};
