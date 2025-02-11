import { setDifficulty, setNextDifficulty } from "@/state/difficulty";
import { gameSate } from "@/state/game-state";
import { applyHardDifficulty } from "@/utils/difficulty/hard";
import { DIFFICULTY, GAME_STATE } from "@/consts";

/** @param {import("@/consts").Difficulty} difficulty */
export function handleDifficultyChange(difficulty) {
  if (gameSate === GAME_STATE.READY) {
    setDifficulty(difficulty);
    setNextDifficulty(null);

    // TODO: if difficulty is easy or normal
    // - set maxTries to TRIES.MAX
    // - update $maxTries to TRIES.MAX)
    // - generate tries indicators
    // - update $triesIndicators
    if (difficulty === DIFFICULTY.HARD) return applyHardDifficulty();
  } else if (gameSate === GAME_STATE.PLAYING) {
    setNextDifficulty(difficulty);
  } else {
    throw new Error("Invalid game state for difficulty change");
  }
}
