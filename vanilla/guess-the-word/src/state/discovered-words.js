/** @typedef {import("@/consts").DefinitionWord} DefinitionWord */

const LOCAL_STORAGE_KEY = "discovered-words";

export let discoveredWords = (() => {
  /** @type {Set<DefinitionWord>} */
  const list = new Set();
  const savedWords = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedWords = JSON.parse(savedWords ?? "[]");

  if (Array.isArray(parsedWords)) {
    for (const word of parsedWords) list.add(word);
  }

  return list;
})();
