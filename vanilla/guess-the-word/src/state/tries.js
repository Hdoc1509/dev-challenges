import { getSelectedDifficulty } from "@/ui/difficulty-form";
import { IS_DEV } from "@/config";
import { DIFFICULTY } from "@/consts/difficulty";
import { TRIES } from "@/consts/tries";

/** @type {number} */
export let tries = TRIES.NONE;

export const resetTries = () => {
  if (tries === TRIES.NONE) return;
  tries = TRIES.NONE;
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
