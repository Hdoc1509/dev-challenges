import { setWords } from "@/state/words";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";

export const WhyDifficulty = Object.freeze({
  apply: async () => await setWords(DIFFICULTY_GROUP.WHY),
});
