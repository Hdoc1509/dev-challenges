/** @typedef {import("@/consts").DefinitionWord} DefinitionWord */

const LOCAL_STORAGE_KEY = "discovered-words";

/** @type {DefinitionWord[]} */
const wordsToSave = [];

export let discoveredWords = (() => {
  /** @type {Set<DefinitionWord>} */
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

/** @param {DefinitionWord} word */
export const addDiscoveredWord = (word) => {
  discoveredWords.add(word);
  wordsToSave.unshift(word);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wordsToSave));
};
