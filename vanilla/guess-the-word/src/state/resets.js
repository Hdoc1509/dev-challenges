import { getSelectedDifficulty } from "@/ui/difficulty-form";
import { IS_DEV } from "@/config";
import { DIFFICULTY, RESETS } from "@/consts";

/** @type {number} */
export let gameResets = RESETS.NONE;

export const resetGameResets = () => {
  gameResets = RESETS.NONE;
  if (IS_DEV) console.log({ resets: gameResets });
};

export const increaseGameResets = () => {
  gameResets++;
  if (IS_DEV) console.log({ resets: gameResets });
};

export let maxResets = (() => {
  const difficulty = getSelectedDifficulty();

  if (difficulty === DIFFICULTY.MASTER) return RESETS.MAX.MASTER;
  if (difficulty === DIFFICULTY.WHY) return RESETS.MAX.WHY;
  return RESETS.MAX.DEFAULT;
})();

/** @param {number} newMaxResets */
export const setMaxResets = (newMaxResets) => {
  maxResets = newMaxResets;
  if (IS_DEV) console.log({ maxResets });
};
