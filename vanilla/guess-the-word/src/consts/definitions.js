import DEFINITIONS_MOCK from "@/mocks/definitions.json";

// TODO: set these in a json file
// - merge them with mock of raw data when generating the mocks
export const CUSTOM_DEFINITIONS = {
  example: [
    "A representative form or pattern",
    "Something to be imitated",
    "An occurrrence of something",
  ],
  javascript: [
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction#what_is_javascript
    "A cross-platform, object-oriented scripting language used to make webpages interactive",
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript
    "A lightweight interpreted (or just-in-time compiled) programming language with first-class functions",
  ],
  coding: ["Act of writing in code or cipher"],
  flower: [
    "A plant cultivated for its blooms or blossoms",
    "The period of greatest prosperity or productivity",
    "Reproductive organ of angiosperm plants especially one having showy or colorful parts",
  ],
  adventure: [
    "Take a risk in the hope of a favorable outcome",
    "Put at risk",
    "A wild and exciting undertaking (not necessarily lawful",
  ],
};

export const DEFINITIONS = Object.freeze({
  ...DEFINITIONS_MOCK,
  ...CUSTOM_DEFINITIONS,
});
/** @typedef {keyof typeof DEFINITIONS} DefinitionWord */

export const TOTAL_WORDS = Object.keys(DEFINITIONS).length;
