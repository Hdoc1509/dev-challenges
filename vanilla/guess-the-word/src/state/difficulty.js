import { DIFFICULTY } from "@/consts";

/** @type {import("@/consts").Difficulty} */
export let difficulty = DIFFICULTY.NORMAL;

/** @param {import("@/consts").Difficulty} newDifficulty */
export const setDifficulty = (newDifficulty) => (difficulty = newDifficulty);

/** @type {import("@/consts").Difficulty | null} */
export let nextDifficulty = null;

/** @param {import("@/consts").Difficulty | null} newDifficulty */
export const setNextDifficulty = (newDifficulty) =>
  (nextDifficulty = newDifficulty);
