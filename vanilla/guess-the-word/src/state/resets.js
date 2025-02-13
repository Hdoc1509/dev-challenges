import { getSelectedDifficulty } from "@/ui/difficulty-form";
import { IS_DEV } from "@/config";
import { DIFFICULTY, RESETS } from "@/consts";

export let resets = RESETS.NONE;

export const resetResets = () => {
  resets = RESETS.NONE;
  if (IS_DEV) console.log({ resets });
};

export const increaseResets = () => {
  resets++;
  if (IS_DEV) console.log({ resets });
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
