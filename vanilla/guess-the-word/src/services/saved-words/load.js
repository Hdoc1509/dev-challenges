import { parseOldFormat } from "./parse-old";
import { parseSavedWords } from "./parse";
import {
  DiscoveredWordsByDifficulty,
  discoveredWords,
} from "@/state/discovered-words";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";
import { DISCOVERED_WORDS } from "@/consts/discovered-words";

export const loadSavedWords = async () => {
  // FIX: onlye load item with old format if current format is not found
  const oldSavedItem = localStorage.getItem(
    DISCOVERED_WORDS.LOCAL_STORAGE_OLD_KEY,
  );

  if (oldSavedItem != null) {
    const parsedItem = JSON.parse(oldSavedItem);
    await parseOldFormat(parsedItem, ({ word, difficulties, completed }) => {
      difficulties.forEach((difficulty) =>
        DiscoveredWordsByDifficulty.get(difficulty)?.add(word),
      );
      discoveredWords.set(word, completed ? DIFFICULTIES_ALL : difficulties);
    });

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
