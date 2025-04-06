import { setMaxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import {
  $maxTries,
  captureTriesIndicators,
  generateTriesIndicators,
  setTriesIndicators,
} from "@/ui/tries";
import { TRIES } from "@/consts/tries";

export const HardDifficulty = Object.freeze({
  async apply() {
    setWords(await import("@/consts/words/normal").then((mod) => mod.default));
    setMaxTries(TRIES.MAX_HARD);
    $maxTries.textContent = `${TRIES.MAX_HARD}`;
    generateTriesIndicators(TRIES.MAX_HARD);
    setTriesIndicators(captureTriesIndicators());
  },
});
