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
