import { discoveredWords } from "@/state/discovered-words";
import { sanitizeStoredItem } from "./sanitize";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";
import { DISCOVERED_WORDS } from "@/consts/discovered-words";

/** @param {import("./adapter").WordItem} wordItem */
const loadWordItem = ({ word, difficulties, completed }) => {
  discoveredWords.set(word, completed ? DIFFICULTIES_ALL : difficulties);
};

/** @param {(loadedWord: import("./adapter").WordItem) => Promise<void>} onLoadedWord */
export const loadSavedWords = async (onLoadedWord) => {
  const oldSavedItem = localStorage.getItem(
    DISCOVERED_WORDS.LOCAL_STORAGE_OLD_KEY,
  );
  const savedItem = localStorage.getItem(DISCOVERED_WORDS.LOCAL_STORAGE_KEY);

  if (oldSavedItem != null && savedItem == null) {
    const sanitized = sanitizeStoredItem(oldSavedItem);
    // TODO: rename to oldItemFormatAdapter()
    const { parseOldFormat } = await import("./parse-old");

    await parseOldFormat(sanitized, async (parsedItem) => {
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
    const sanitized = sanitizeStoredItem(savedItem);
    const { savedWordsAdapter } = await import("./adapter");

    await savedWordsAdapter(sanitized, async (wordItem) => {
      loadWordItem(wordItem);
      await onLoadedWord(wordItem);
    });
  }
};
