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
  TYPING: Object.freeze({
    LETTER: Object.freeze({
      CURRENT: "typing__letter--current",
      MISTAKEN: "typing__letter--mistaken",
    }),
  }),
  MISTAKES: Object.freeze({
    LETTER: "mistakes__letter",
  }),
});

export const CSS_VARIABLES = Object.freeze({
  MISTAKEN_LETTER: Object.freeze({
    TEXT: "--mistaken-letter-text",
  }),
  LETTER_BORDER: Object.freeze({
    MISTAKEN: "--letter-border-mistaken",
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

export const GAME_STATE = Object.freeze({
  READY: "ready",
  PLAYING: "playing",
});
/** @typedef {GAME_STATE[keyof GAME_STATE]} GameState */
