import { DIFFICULTY_GROUP } from "@/consts/difficulty";
import { setWords } from "@/state/words";

export const ExtremeDifficulty = Object.freeze({
  apply: async () => await setWords(DIFFICULTY_GROUP.EXTREME),
});
