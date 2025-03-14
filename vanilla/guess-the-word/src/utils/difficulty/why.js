import { setWords } from "@/state/words";
import { WORDS } from "@/consts";

export const WhyDifficulty = Object.freeze({
  apply() {
    setWords(WORDS.WHY);
  },
});
