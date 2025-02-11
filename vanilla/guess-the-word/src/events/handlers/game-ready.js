import { setDifficulty, setNextDifficulty } from "@/state/difficulty";
import { maxTries } from "@/state/tries";
import { applyHardDifficulty } from "@/utils/difficulty/hard";
import { applyNormalDifficulty } from "@/utils/difficulty/normal";
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
  )
    applyNormalDifficulty();
  else if (difficulty === DIFFICULTY.HARD) applyHardDifficulty();
}
