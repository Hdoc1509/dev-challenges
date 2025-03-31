import { getSelectedDifficulty } from "@/ui/difficulty-form";
import { IS_DEV } from "@/config";

/** @type {import("@/consts/difficulty").Difficulty} */
export let difficulty = getSelectedDifficulty();

/** @param {import("@/consts/difficulty").Difficulty} newDifficulty */
export const setDifficulty = (newDifficulty) => {
  difficulty = newDifficulty;
  if (IS_DEV) console.log({ difficulty });
};
