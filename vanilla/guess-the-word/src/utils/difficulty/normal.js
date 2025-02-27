import { setMaxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import {
  $maxTries,
  captureTriesIndicators,
  generateTriesIndicators,
  setTriesIndicators,
} from "@/ui/tries";
import { TRIES, WORDS } from "@/consts";

export const NormalDifficulty = Object.freeze({
  apply() {
    setWords(WORDS.NORMAL);
    setMaxTries(TRIES.MAX);
    $maxTries.textContent = `${TRIES.MAX}`;
    generateTriesIndicators(TRIES.MAX);
    setTriesIndicators(captureTriesIndicators());
  },
});
