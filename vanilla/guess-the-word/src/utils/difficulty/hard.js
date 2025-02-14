import { setMaxTries } from "@/state/tries";
import {
  $maxTries,
  captureTriesIndicators,
  generateTriesIndicators,
  setTriesIndicators,
} from "@/ui/tries";
import { TRIES } from "@/consts";

export function applyHardDifficulty() {
  setMaxTries(TRIES.MAX_HARD);
  $maxTries.textContent = `${TRIES.MAX_HARD}`;
  generateTriesIndicators(TRIES.MAX_HARD);
  setTriesIndicators(captureTriesIndicators());
}
