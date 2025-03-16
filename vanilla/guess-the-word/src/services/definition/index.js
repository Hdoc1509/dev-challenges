import { DEFINITIONS } from "@/consts/definitions";

/** @param {import("@/consts/definitions").DefinitionWord} word */
export const getMockedDefinition = async (word) => {
  /** @type {string[]} */
  const definitions = DEFINITIONS[word];

  return definitions;
};
