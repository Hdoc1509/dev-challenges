import { setWordsByDifficulty } from "@/state/words";
import { DIFFICULTY } from "@/consts/difficulty";

export const WhyDifficulty = Object.freeze({
  apply: async () => await setWordsByDifficulty(DIFFICULTY.WHY),
});
