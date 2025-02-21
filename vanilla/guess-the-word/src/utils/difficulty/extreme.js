import { setWords } from "@/state/words";
import { WORDS } from "@/consts";

export function applyExtremeDifficulty() {
  setWords(WORDS.EXTREME);
}
