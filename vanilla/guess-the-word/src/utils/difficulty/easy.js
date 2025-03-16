import { setMaxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import {
  $maxTries,
  captureTriesIndicators,
  generateTriesIndicators,
  setTriesIndicators,
} from "@/ui/tries";
import { TRIES } from "@/consts/tries";

export const EasyDifficulty = Object.freeze({
  async apply() {
    setWords(await import("@/consts/words/easy").then((mod) => mod.default));
    setMaxTries(TRIES.MAX);
    $maxTries.textContent = `${TRIES.MAX}`;
    generateTriesIndicators(TRIES.MAX);
    setTriesIndicators(captureTriesIndicators());
  },
});
