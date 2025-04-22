import { setWordsByDifficulty } from "@/state/words";
import { DIFFICULTY } from "@/consts/difficulty";

export const ExtremeDifficulty = Object.freeze({
  apply: async () => await setWordsByDifficulty(DIFFICULTY.EXTREME),
});
