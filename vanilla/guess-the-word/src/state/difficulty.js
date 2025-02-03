import { getSelectedDifficulty } from "@/ui/difficulty-form";
import { IS_DEV } from "@/config";

/** @type {import("@/consts").Difficulty} */
export let difficulty = getSelectedDifficulty();

/** @param {import("@/consts").Difficulty} newDifficulty */
export const setDifficulty = (newDifficulty) => {
  difficulty = newDifficulty;
  if (IS_DEV) console.log({ difficulty });
};

/** @type {import("@/consts").Difficulty | null} */
export let nextDifficulty = null;

/** @param {import("@/consts").Difficulty | null} newDifficulty */
export const setNextDifficulty = (newDifficulty) => {
  nextDifficulty = newDifficulty;
  if (IS_DEV) console.log({ nextDifficulty });
};
