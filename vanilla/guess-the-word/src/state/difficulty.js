import { DIFFICULTY } from "@/consts";

/** @type {import("@/consts").Difficulty} */
export let difficulty = DIFFICULTY.NORMAL;

/** @param {import("@/consts").Difficulty} newDifficulty */
export const setDifficulty = (newDifficulty, { debug = false } = {}) => {
  difficulty = newDifficulty;
  if (debug) console.log({ difficulty });
};

/** @type {import("@/consts").Difficulty | null} */
export let nextDifficulty = null;

/** @param {import("@/consts").Difficulty | null} newDifficulty */
export const setNextDifficulty = (newDifficulty, { debug = false } = {}) => {
  nextDifficulty = newDifficulty;
  if (debug) console.log({ nextDifficulty });
};
