import { getSelectedDifficulty } from "@/ui/difficulty-form";
import { IS_DEV } from "@/config";
import { RESETS } from "@/consts/resets";
import { DIFFICULTY } from "@/consts/difficulty";

/** @type {number} */
export let gameResets = RESETS.NONE;

export const resetGameResets = () => {
  if (gameResets === RESETS.NONE) return;
  gameResets = RESETS.NONE;
  if (IS_DEV) console.log({ gameResets });
};

export const increaseGameResets = () => {
  gameResets++;
  if (IS_DEV) console.log({ gameResets });
};

export let maxResets = (() => {
  const difficulty = getSelectedDifficulty();

  if (difficulty === DIFFICULTY.MASTER) return RESETS.MAX.MASTER;
  if (difficulty === DIFFICULTY.VOID) return RESETS.MAX.VOID;
  return RESETS.MAX.DEFAULT;
})();

/** @param {number} newMaxResets */
export const setMaxResets = (newMaxResets) => {
  maxResets = newMaxResets;
  if (IS_DEV) console.log({ maxResets });
};
