const LOCAL_STORAGE_KEY = "discovered-words";

/** @type {string[]} */
const wordsToSave = [];

export const discoveredWords = (() => {
  /** @type {Set<string>} */
  const list = new Set();
  const savedWords = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedWords = JSON.parse(savedWords ?? "[]");

  if (Array.isArray(parsedWords)) {
    for (const word of parsedWords) {
      list.add(word);
      wordsToSave.push(word);
    }
  }

  return list;
})();

/** @param {string} word */
export const addDiscoveredWord = (word) => {
  discoveredWords.add(word);
  wordsToSave.unshift(word);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wordsToSave));
};
