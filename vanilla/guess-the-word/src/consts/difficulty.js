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

export const DIFFICULTY_OPTION = Object.freeze({
  [DIFFICULTY.EASY]: {
    description: "Words with at most 6 letters",
  },
  [DIFFICULTY.NORMAL]: {
    description: "Words with 7 ~ 9 letters",
    checked: true,
  },
  [DIFFICULTY.HARD]: {
    description: "Only 2 tries",
    extraDifficulty: DIFFICULTY.NORMAL,
  },
  [DIFFICULTY.MASTER]: {
    description: "Only 2 resets",
    extraDifficulty: DIFFICULTY.HARD,
  },
  [DIFFICULTY.EXTREME]: {
    description: "Words with 10 ~ 12 letters",
    extraDifficulty: DIFFICULTY.MASTER,
  },
  [DIFFICULTY.INSANE]: {
    description: "3 ~ 5 seconds per letter",
    extraDifficulty: DIFFICULTY.EXTREME,
  },
  [DIFFICULTY.WHY]: {
    description: "Words with at least 13 letters",
    /** @param {string} label */
    onLabel: (label) => `${label}?`,
    extraDifficulty: DIFFICULTY.INSANE,
  },
  [DIFFICULTY.VOID]: {
    description: "No resets",
    extraDifficulty: DIFFICULTY.WHY,
    /** @param {string} label */
    onExtraLabel: (label) => `${label}?`,
  },
});
