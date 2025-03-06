/** @typedef {import("@/consts").DefinitionWord} DefinitionWord */

export let discoveredWords = (() => {
  /** @type {Set<DefinitionWord>} */
  const list = new Set();
  const savedWords = localStorage.getItem("discovered-words");
  const parsedWords = JSON.parse(savedWords ?? "[]");

  if (Array.isArray(parsedWords)) {
    for (const word of parsedWords) list.add(word);
  }

  return list;
})();
