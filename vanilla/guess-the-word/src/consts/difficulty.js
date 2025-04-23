export const DIFFICULTY = Object.freeze({
  EASY: "easy",
  NORMAL: "normal",
  HARD: "hard",
  MASTER: "master",
  EXTREME: "extreme",
  INSANE: "insane",
  WHY: "why",
  VOID: "void",
});
/** @typedef {DIFFICULTY[keyof DIFFICULTY]} Difficulty */

export const DIFFICULTIES = new Set(Object.values(DIFFICULTY));

export const DIFFICULTIES_ALL = "all";
/** @typedef {typeof DIFFICULTIES_ALL} DifficultiesAll */

export const DIFFICULTY_GROUP = Object.freeze({
  [DIFFICULTY.EASY]: DIFFICULTY.EASY,
  [DIFFICULTY.NORMAL]: DIFFICULTY.NORMAL,
  [DIFFICULTY.HARD]: DIFFICULTY.NORMAL,
  [DIFFICULTY.MASTER]: DIFFICULTY.NORMAL,
  [DIFFICULTY.EXTREME]: DIFFICULTY.EXTREME,
  [DIFFICULTY.INSANE]: DIFFICULTY.EXTREME,
  [DIFFICULTY.WHY]: DIFFICULTY.WHY,
  [DIFFICULTY.VOID]: DIFFICULTY.WHY,
});
/** @typedef {DIFFICULTY_GROUP[keyof DIFFICULTY_GROUP]} DifficultyGroup */
