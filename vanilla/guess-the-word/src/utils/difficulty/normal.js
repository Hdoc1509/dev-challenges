import { setMaxTries } from "@/state/tries";
import {
  $maxTries,
  captureTriesIndicators,
  generateTriesIndicators,
  setTriesIndicators,
} from "@/ui/tries";
import { TRIES } from "@/consts";

export function applyNormalDifficulty() {
  setMaxTries(TRIES.MAX);
  $maxTries.textContent = `${TRIES.MAX}`;
  generateTriesIndicators(TRIES.MAX);
  setTriesIndicators(captureTriesIndicators());
}
