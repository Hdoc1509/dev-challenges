import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { isWordRemovedFromGame } from "@/utils/word-removed";
import { DIFFICULTIES } from "@/consts/difficulty";
/** @typedef {import("@/consts/difficulty").Difficulty} Difficulty */

const LOCAL_STORAGE_OLD_KEY = "discovered-words";
const LOCAL_STORAGE_KEY = `dev-challenges/guess-the-word/${LOCAL_STORAGE_OLD_KEY}`;

/** @type {Map<string, Array<Difficulty>>} */
// TODO: update type to: Map<string, Difficulty[] | "all">
export const discoveredWords = new Map();

export const loadSavedWords = async () => {
  const oldSavedItem = localStorage.getItem(LOCAL_STORAGE_OLD_KEY);

  if (oldSavedItem != null) {
    const parsedItem = JSON.parse(oldSavedItem);

    if (Array.isArray(parsedItem)) {
      /** @type {Array<[string, Difficulty[]]>} */
      const data = [];

      for (const item of parsedItem) {
        if (typeof item === "string" && !(await isWordRemovedFromGame(item))) {
          const difficulty = getDifficultiesOfWord(item)[0];

          // TODO: if difficulty is "easy", then add "all" to the list
          data.unshift([item, [difficulty]]);
        }
      }

      for (const [word, difficulties] of data)
        discoveredWords.set(word, difficulties);
    }

    const data = Array.from(discoveredWords);

    localStorage.removeItem(LOCAL_STORAGE_OLD_KEY);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    return;
  }

  const savedItem = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (savedItem === null) return;

  const parsedItem = JSON.parse(savedItem);

  if (!Array.isArray(parsedItem)) return;

  for (const item of parsedItem) {
    if (Array.isArray(item)) {
      if (item.length !== 2) continue;

      const [word, difficulties] = item;

      // TODO: if difficulties is "all", discoveredWords.set(word, "all");

      if (
        typeof word !== "string" ||
        !Array.isArray(difficulties) ||
        !difficulties.every(
          /** @param {string} difficulty
           * @returns {difficulty is Difficulty}
           */ (difficulty) =>
            DIFFICULTIES.has(/** @type {Difficulty} */ (difficulty)),
        ) ||
        (await isWordRemovedFromGame(word))
      )
        continue;

      // TODO: if getDifficultiesOfWord(word) same length as difficulties,
      // then add "all" as the difficulty
      discoveredWords.set(word, difficulties);
    }
  }
};

/**
 * @param {string} word
 * @param {{ difficulty: Difficulty }} extraParams
 */
export const addDiscoveredWord = (word, { difficulty }) => {
  if (!getDifficultiesOfWord(word).includes(difficulty)) return;

  const savedWordDifficulties = discoveredWords.get(word);
  const difficulties = new Set(savedWordDifficulties ?? [difficulty]).add(
    difficulty,
  );

  if (difficulties.size === savedWordDifficulties?.length) return;

  discoveredWords.set(word, Array.from(difficulties));

  const data = Array.from(discoveredWords);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};
