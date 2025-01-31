// TODO: allow user to create a list of words and use them
export const DEFAULT_WORDS = [
  "example",
  "javascript",
  "coding",
  "challenge",
  "flower",
  "adventure",
];

export const CLASSES = Object.freeze({
  TYPING_LETTER_CURRENT: "typing__letter--current",
  TYPING_LETTER_MISTAKEN: "typing__letter--mistaken",
  MISTAKES_LETTER: "mistakes__letter",
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
