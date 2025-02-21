import WORDS_NORMAL from "@/mocks/words/normal.json";
import WORDS_EXTREME from "@/mocks/words/extreme.json";

const CUSTOM_WORDS = [
  "example",
  "javascript",
  "coding",
  "challenge",
  "flower",
  "adventure",
];

export const WORDS = Object.freeze({
  NORMAL: Object.freeze(
    WORDS_NORMAL.concat(CUSTOM_WORDS.filter((word) => word.length < 10)),
  ),
  EXTREME: Object.freeze(
    WORDS_EXTREME.concat(CUSTOM_WORDS.filter((word) => word.length >= 10)),
  ),
});

export const CLASSES = Object.freeze({
  TYPING: Object.freeze({
    LETTER__CURRENT: "typing__letter--current",
    LETTER__MISTAKEN: "typing__letter--mistaken",
  }),
  MISTAKES: Object.freeze({
    LETTER: "mistakes__letter",
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

export const CSS_VARIABLES = Object.freeze({
  MISTAKEN_LETTER_TEXT: "--mistaken-letter-text",
  LETTER_BORDER_MISTAKEN: "--letter-border-mistaken",
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
export const DIFFICULTIES = Object.freeze([
  DIFFICULTY.EASY,
  DIFFICULTY.NORMAL,
  DIFFICULTY.HARD,
  DIFFICULTY.MASTER,
  DIFFICULTY.EXTREME,
  DIFFICULTY.INSANE,
  DIFFICULTY.WHY,
]);
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
    WHY: 0,
  }),
  NONE: 0,
});
