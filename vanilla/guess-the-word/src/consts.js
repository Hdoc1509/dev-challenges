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
