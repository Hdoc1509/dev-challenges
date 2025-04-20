import { parseOldFormat } from "./parse-old";
import { parseSavedWords } from "./parse";
import {
  DiscoveredWordsByDifficulty,
  discoveredWords,
} from "@/state/discovered-words";
import { DIFFICULTIES_ALL, DIFFICULTY } from "@/consts/difficulty";
import { DISCOVERED_WORDS } from "@/consts/discovered-words";

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

  await parseSavedWords(parsedItem, ({ word, difficulties, completed }) => {
    difficulties.forEach((difficulty) =>
      DiscoveredWordsByDifficulty.get(difficulty)?.add(word),
    );
    discoveredWords.set(word, completed ? DIFFICULTIES_ALL : difficulties);
  });
};
