import { setWords } from "@/state/words";
import { WORDS } from "@/consts";

export const EasyDifficulty = Object.freeze({
  apply() {
    setWords(WORDS.EASY);
  },
});
