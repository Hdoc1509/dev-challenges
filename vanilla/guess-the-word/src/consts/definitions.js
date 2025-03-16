import DEFINITIONS_MOCK from "@/mocks/definitions.json";

export const DEFINITIONS = Object.freeze(DEFINITIONS_MOCK);
/** @typedef {keyof typeof DEFINITIONS} DefinitionWord */

export const TOTAL_WORDS = Object.keys(DEFINITIONS).length;
