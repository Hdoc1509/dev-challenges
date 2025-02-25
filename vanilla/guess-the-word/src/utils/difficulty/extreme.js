import { setWords } from "@/state/words";
import { WORDS } from "@/consts";

export function applyExtremeDifficulty() {
  setWords(WORDS.EXTREME);
}

export const ExtremeDifficulty = Object.freeze({
  apply: () => setWords(WORDS.EXTREME),
  unapply: () => setWords(WORDS.NORMAL),
});
