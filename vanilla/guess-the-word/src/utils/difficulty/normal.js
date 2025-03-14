import { setMaxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import {
  $maxTries,
  captureTriesIndicators,
  generateTriesIndicators,
  setTriesIndicators,
} from "@/ui/tries";
import { WORDS } from "@/consts/words";
import { TRIES } from "@/consts/tries";

export const NormalDifficulty = Object.freeze({
  apply() {
    setWords(WORDS.NORMAL);
    setMaxTries(TRIES.MAX);
    $maxTries.textContent = `${TRIES.MAX}`;
    generateTriesIndicators(TRIES.MAX);
    setTriesIndicators(captureTriesIndicators());
  },
});
