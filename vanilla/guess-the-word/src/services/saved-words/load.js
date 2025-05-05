import { discoveredWords } from "@/state/discovered-words";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";
import { DISCOVERED_WORDS } from "@/consts/discovered-words";

/** @param {import("./parse").SavedWordItem} wordItem */
const loadWordItem = ({ word, difficulties, completed }) => {
  discoveredWords.set(word, completed ? DIFFICULTIES_ALL : difficulties);
};

/** @param {(loadedWord: import("./parse").SavedWordItem) => Promise<void>} onLoadedWord */
export const loadSavedWords = async (onLoadedWord) => {
  const oldSavedItem = localStorage.getItem(
    DISCOVERED_WORDS.LOCAL_STORAGE_OLD_KEY,
  );
  const savedItem = localStorage.getItem(DISCOVERED_WORDS.LOCAL_STORAGE_KEY);

  if (oldSavedItem != null && savedItem == null) {
    const { parseOldFormat } = await import("./parse-old");

    await parseOldFormat(JSON.parse(oldSavedItem), async (parsedItem) => {
      loadWordItem(parsedItem);
      await onLoadedWord(parsedItem);
    });

    const data = Array.from(discoveredWords);

    localStorage.removeItem(DISCOVERED_WORDS.LOCAL_STORAGE_OLD_KEY);
    localStorage.setItem(
      DISCOVERED_WORDS.LOCAL_STORAGE_KEY,
      JSON.stringify(data),
    );
  } else if (savedItem != null) {
    const { parseSavedWords } = await import("./parse");

    await parseSavedWords(JSON.parse(savedItem), async (parsedItem) => {
      loadWordItem(parsedItem);
      await onLoadedWord(parsedItem);
    });
  }
};
