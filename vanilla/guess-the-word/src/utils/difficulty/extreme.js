import { setWords } from "@/state/words";
import { WORDS } from "@/consts/words";

export const ExtremeDifficulty = Object.freeze({
  apply: () => setWords(WORDS.EXTREME),
});
