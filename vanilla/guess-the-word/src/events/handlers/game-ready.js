import { setDifficulty, setNextDifficulty } from "@/state/difficulty";
import { maxTries } from "@/state/tries";
import { applyHardDifficulty } from "@/utils/difficulty/hard";
import { applyNormalDifficulty } from "@/utils/difficulty/normal";
import { applyMasterDifficulty } from "@/utils/difficulty/master";
import { $resetsContainer } from "@/ui/info";
import { DIFFICULTY, TRIES } from "@/consts";

/**
 * @param {Object} params
 * @param {import("@/consts").Difficulty} params.difficulty
 */
export function handleGameReady({ difficulty }) {
  setDifficulty(difficulty);
  setNextDifficulty(null);

  if (
    (difficulty === DIFFICULTY.EASY || difficulty === DIFFICULTY.NORMAL) &&
    maxTries !== TRIES.MAX
  ) {
    applyNormalDifficulty();
    $resetsContainer.removeAttribute("data-active");
  } else if (difficulty === DIFFICULTY.HARD) {
    applyHardDifficulty();
    $resetsContainer.removeAttribute("data-active");
  } else if (difficulty === DIFFICULTY.MASTER) {
    applyHardDifficulty();
    applyMasterDifficulty();
  }
}
