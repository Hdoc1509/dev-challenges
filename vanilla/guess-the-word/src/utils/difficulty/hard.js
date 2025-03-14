import { setMaxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import {
  $maxTries,
  captureTriesIndicators,
  generateTriesIndicators,
  setTriesIndicators,
} from "@/ui/tries";
import { TRIES } from "@/consts";
import { WORDS } from "@/consts/words";

export const HardDifficulty = Object.freeze({
  apply() {
    setWords(WORDS.NORMAL);
    setMaxTries(TRIES.MAX_HARD);
    $maxTries.textContent = `${TRIES.MAX_HARD}`;
    generateTriesIndicators(TRIES.MAX_HARD);
    setTriesIndicators(captureTriesIndicators());
  },
});
