import { setWords } from "@/state/words";
import { WORDS } from "@/consts";

export const ExtremeDifficulty = Object.freeze({
  apply: () => setWords(WORDS.EXTREME),
});
