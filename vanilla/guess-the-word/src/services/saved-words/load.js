import { parseOldFormat } from "./parse-old";
import {
  DiscoveredWordsByDifficulty,
  discoveredWords,
} from "@/state/discovered-words";
import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { isWordRemovedFromGame } from "@/utils/word-removed";
import {
  DIFFICULTIES,
  DIFFICULTIES_ALL,
  DIFFICULTY,
} from "@/consts/difficulty";
import { DISCOVERED_WORDS } from "@/consts/discovered-words";
/** @typedef {import("@/consts/difficulty").Difficulty} Difficulty */
/** @typedef {typeof DIFFICULTIES_ALL} DifficultiesAll */

export const loadSavedWords = async () => {
  const oldSavedItem = localStorage.getItem(
    DISCOVERED_WORDS.LOCAL_STORAGE_OLD_KEY,
  );

  if (oldSavedItem != null) {
    const savedData = await parseOldFormat(JSON.parse(oldSavedItem));

    for (const [word, difficulty] of savedData) {
      if (difficulty === DIFFICULTIES_ALL) {
        DiscoveredWordsByDifficulty.get(DIFFICULTY.EASY)?.add(word);
        discoveredWords.set(word, difficulty);
      } else {
        DiscoveredWordsByDifficulty.get(difficulty)?.add(word);
        discoveredWords.set(word, [difficulty]);
      }
    }

    const data = Array.from(discoveredWords);

    localStorage.removeItem(DISCOVERED_WORDS.LOCAL_STORAGE_OLD_KEY);
    localStorage.setItem(
      DISCOVERED_WORDS.LOCAL_STORAGE_KEY,
      JSON.stringify(data),
    );
    return;
  }

  const savedItem = localStorage.getItem(DISCOVERED_WORDS.LOCAL_STORAGE_KEY);

  if (savedItem === null) return;

  const parsedItem = JSON.parse(savedItem);

  if (!Array.isArray(parsedItem)) return;

  for (const item of parsedItem) {
    if (!Array.isArray(item) || item.length !== 2) continue;

    const [word, difficulties] = item;

    if (typeof word !== "string") continue;

    if (difficulties === DIFFICULTIES_ALL)
      discoveredWords.set(word, DIFFICULTIES_ALL);
    else if (
      Array.isArray(difficulties) &&
      difficulties.every(
        /** @returns {difficulty is Difficulty} */
        (difficulty) => DIFFICULTIES.has(difficulty),
      ) &&
      !(await isWordRemovedFromGame(word))
    )
      discoveredWords.set(
        word,
        getDifficultiesOfWord(word).length === difficulties.length
          ? DIFFICULTIES_ALL
          : difficulties,
      );
  }
};
