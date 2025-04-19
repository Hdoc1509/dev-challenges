import { DIFFICULTY } from "@/consts/difficulty";
/** @typedef {import("@/consts/difficulty").Difficulty} Difficulty */
/** @typedef {import("@/consts/difficulty").DifficultiesAll} DifficultiesAll */

/** @type {Map<string, Difficulty[] | DifficultiesAll>} */
export const discoveredWords = new Map();

// NOTE: add new Statistics tab to Menu

/** @type {Map<Difficulty, Set<string>>} */
export const DiscoveredWordsByDifficulty = new Map([
  [DIFFICULTY.EASY, new Set()],
  [DIFFICULTY.NORMAL, new Set()],
  [DIFFICULTY.HARD, new Set()],
  [DIFFICULTY.MASTER, new Set()],
  [DIFFICULTY.EXTREME, new Set()],
  [DIFFICULTY.INSANE, new Set()],
  [DIFFICULTY.WHY, new Set()],
  [DIFFICULTY.VOID, new Set()],
]);
