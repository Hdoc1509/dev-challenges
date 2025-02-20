import { setWords } from "@/state/words";
import { WORDS } from "@/consts";

export function applyExtremeDifficulty() {
  setWords(WORDS.MIN_TEN_LETTERS);
}
