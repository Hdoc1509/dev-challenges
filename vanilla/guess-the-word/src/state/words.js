import { DIFFICULTY_GROUP } from "@/consts/difficulty";
/** @typedef {import("@/consts/difficulty").DifficultyGroup} DifficultyGroup */

/** @type {Map<DifficultyGroup, Set<string> | null>} */
// NOTE: delete from this map once a word has completed all of its difficulties
const AvailableWords = new Map([
  [DIFFICULTY_GROUP.EASY, null],
  [DIFFICULTY_GROUP.NORMAL, null],
  [DIFFICULTY_GROUP.EXTREME, null],
  [DIFFICULTY_GROUP.WHY, null],
]);

/** @type {readonly string[]} */
export let words = [];

/** @param {readonly string[]} newWords */
export const setWords = (newWords) => (words = newWords);
