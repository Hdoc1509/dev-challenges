import WORDS_EASY from "@/mocks/words/easy.json";
import WORDS_NORMAL from "@/mocks/words/normal.json";
import WORDS_EXTREME from "@/mocks/words/extreme.json";
import WORDS_WHY from "@/mocks/words/why.json";
import DEFINITIONS_MOCK from "@/mocks/definitions.json";

const CUSTOM_DEFINITIONS = {
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
const CUSTOM_WORDS = ["challenge", ...Object.keys(CUSTOM_DEFINITIONS)];

export const DEFINITIONS = Object.freeze({
  ...DEFINITIONS_MOCK,
  ...CUSTOM_DEFINITIONS,
});
/** @typedef {keyof typeof DEFINITIONS} DefinitionWord */
export const TOTAL_WORDS = Object.keys(DEFINITIONS).length;

// TODO: can I use Set() as property value?
// or have `.array` and `.set` sub-properties?
export const WORDS = Object.freeze({
  EASY: Object.freeze(
    WORDS_EASY.concat(CUSTOM_WORDS.filter((word) => word.length <= 6)),
  ),
  NORMAL: Object.freeze(
    WORDS_NORMAL.concat(
      CUSTOM_WORDS.filter((word) => word.length >= 7 && word.length <= 9),
    ),
  ),
  EXTREME: Object.freeze(
    WORDS_EXTREME.concat(CUSTOM_WORDS.filter((word) => word.length >= 10)),
  ),
  WHY: Object.freeze(WORDS_WHY),
});

export const CLASSES = Object.freeze({
  TYPING: Object.freeze({
    LETTER: "typing__letter",
    LETTER__CURRENT: "typing__letter--current",
    LETTER__MISTAKEN: "typing__letter--mistaken",
    LETTER__CORRECT: "typing__letter--correct",
  }),
  TRIES: Object.freeze({
    INDICATOR: "tries__indicator",
  }),
  RESETS: Object.freeze({
    INDICATOR: "resets__indicator",
  }),
  STEPPER: Object.freeze({
    STEP: "stepper__step",
  }),
});

export const DIFFICULTY = Object.freeze({
  EASY: "easy",
  NORMAL: "normal",
  HARD: "hard",
  MASTER: "master",
  EXTREME: "extreme",
  INSANE: "insane",
  WHY: "why",
});
/** @typedef {DIFFICULTY[keyof DIFFICULTY]} Difficulty */

export const TRIES = Object.freeze({
  MAX: 6,
  MAX_HARD: 3,
  FIRST: 1,
  NONE: 0,
});

export const RESETS = Object.freeze({
  MAX: Object.freeze({
    DEFAULT: Infinity,
    MASTER: 2,
    // WHY: 0,
  }),
  NONE: 0,
});
