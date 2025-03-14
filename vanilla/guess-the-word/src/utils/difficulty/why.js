import { setWords } from "@/state/words";
import { WORDS } from "@/consts/words";

export const WhyDifficulty = Object.freeze({
  apply() {
    setWords(WORDS.WHY);
  },
});
