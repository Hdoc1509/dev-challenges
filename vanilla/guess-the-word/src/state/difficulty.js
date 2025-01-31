import { DIFFICULTY } from "@/consts";

/** @type {import("@/consts").Difficulty} */
export let difficulty = DIFFICULTY.NORMAL;

/** @param {import("@/consts").Difficulty} newDifficulty */
export const setDifficulty = (newDifficulty) => (difficulty = newDifficulty);
