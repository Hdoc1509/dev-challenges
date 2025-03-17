import DEFINITIONS_MOCK from "@/mocks/definitions.json";

// NOTE: update `npoint` bin whenever definitions.json changes

export const DEFINITIONS = Object.freeze(DEFINITIONS_MOCK);
/** @typedef {keyof typeof DEFINITIONS} DefinitionWord */

export const TOTAL_WORDS = Object.keys(DEFINITIONS).length;

export const DEFINITIONS_PER_PAGE = 10;
