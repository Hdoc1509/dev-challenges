import { discoveredWords } from "@/state/discovered-words";
import { parseStoredItem } from "./parse";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";
import { DISCOVERED_WORDS } from "@/consts/discovered-words";

/** @param {import("./adapter").WordItem} wordItem */
const loadWordItem = ({ word, difficulties, completed }) => {
  discoveredWords.set(word, completed ? DIFFICULTIES_ALL : difficulties);
};

/** @param {(loadedWord: import("./adapter").WordItem) => Promise<void>} onLoadedWord */
export const loadSavedWords = async (onLoadedWord) => {
  const legacyItem = localStorage.getItem(
    DISCOVERED_WORDS.LOCAL_STORAGE_LEGACY_KEY,
  );
  const savedItem = localStorage.getItem(DISCOVERED_WORDS.LOCAL_STORAGE_KEY);

  if (legacyItem != null && savedItem == null) {
    const sanitized = parseStoredItem(legacyItem);
    const { savedWordsLegacyAdapter } = await import("./legacy-adapter");

    await savedWordsLegacyAdapter(sanitized, async (wordItem) => {
      loadWordItem(wordItem);
      await onLoadedWord(wordItem);
    });

    const data = Array.from(discoveredWords);

    localStorage.removeItem(DISCOVERED_WORDS.LOCAL_STORAGE_LEGACY_KEY);
    localStorage.setItem(
      DISCOVERED_WORDS.LOCAL_STORAGE_KEY,
      JSON.stringify(data),
    );
  } else if (savedItem != null) {
    const sanitized = parseStoredItem(savedItem);
    const { savedWordsAdapter } = await import("./adapter");

    await savedWordsAdapter(sanitized, async (wordItem) => {
      loadWordItem(wordItem);
      await onLoadedWord(wordItem);
    });
  }
};
