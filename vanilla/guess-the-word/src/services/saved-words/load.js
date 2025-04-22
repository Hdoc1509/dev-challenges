import { parseOldFormat } from "./parse-old";
import { parseSavedWords } from "./parse";
import {
  DiscoveredWordsByDifficulty,
  discoveredWords,
} from "@/state/discovered-words";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";
import { DISCOVERED_WORDS } from "@/consts/discovered-words";

/** @param {import("./parse").SavedWordItem} wordItem */
const loadWordItem = ({ word, difficulties, completed }) => {
  difficulties.forEach((difficulty) =>
    DiscoveredWordsByDifficulty.get(difficulty)?.add(word),
  );
  discoveredWords.set(word, completed ? DIFFICULTIES_ALL : difficulties);
};

export const loadSavedWords = async () => {
  const oldSavedItem = localStorage.getItem(
    DISCOVERED_WORDS.LOCAL_STORAGE_OLD_KEY,
  );
  const savedItem = localStorage.getItem(DISCOVERED_WORDS.LOCAL_STORAGE_KEY);

  if (oldSavedItem != null && savedItem == null) {
    await parseOldFormat(JSON.parse(oldSavedItem), loadWordItem);

    const data = Array.from(discoveredWords);

    localStorage.removeItem(DISCOVERED_WORDS.LOCAL_STORAGE_OLD_KEY);
    localStorage.setItem(
      DISCOVERED_WORDS.LOCAL_STORAGE_KEY,
      JSON.stringify(data),
    );
  } else if (savedItem != null)
    await parseSavedWords(JSON.parse(savedItem), loadWordItem);

  return discoveredWords;
};
