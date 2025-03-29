export const DIFFICULTY = Object.freeze({
  EASY: "easy",
  NORMAL: "normal",
  HARD: "hard",
  MASTER: "master",
  EXTREME: "extreme",
  INSANE: "insane",
  WHY: "why",
  VOID: "void"
});
/** @typedef {DIFFICULTY[keyof DIFFICULTY]} Difficulty */

export const DIFFICULTIES = new Set(Object.values(DIFFICULTY));
