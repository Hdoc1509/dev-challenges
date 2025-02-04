import { getSelectedDifficulty } from "@/ui/difficulty-form";
import { DIFFICULTY, TRIES } from "@/consts";
import { IS_DEV } from "@/config";

export let tries = 0;

export const resetTries = () => {
  tries = 0;
  if (IS_DEV) console.log({ tries });
};

export const increaseTries = () => {
  tries++;
  if (IS_DEV) console.log({ tries });
};

/** @type {number} */
export let maxTries =
  getSelectedDifficulty() === DIFFICULTY.HARD ? TRIES.MAX_HARD : TRIES.MAX;

/** @param {number} newMaxTries */
export const setMaxTries = (newMaxTries) => {
  maxTries = newMaxTries;
  if (IS_DEV) console.log({ maxTries });
};
