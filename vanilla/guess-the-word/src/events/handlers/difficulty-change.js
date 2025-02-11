import { setDifficulty, setNextDifficulty } from "@/state/difficulty";
import { gameSate } from "@/state/game-state";
import { maxTries } from "@/state/tries";
import { applyHardDifficulty } from "@/utils/difficulty/hard";
import { applyNormalDifficulty } from "@/utils/difficulty/normal";
import { DIFFICULTY, GAME_STATE, TRIES } from "@/consts";

/** @param {import("@/consts").Difficulty} difficulty */
export function handleDifficultyChange(difficulty) {
  if (gameSate === GAME_STATE.READY) {
    setDifficulty(difficulty);
    setNextDifficulty(null);

    if (
      (difficulty === DIFFICULTY.EASY || difficulty === DIFFICULTY.NORMAL) &&
      maxTries !== TRIES.MAX
    )
      applyNormalDifficulty();
    else if (difficulty === DIFFICULTY.HARD) applyHardDifficulty();
  } else if (gameSate === GAME_STATE.PLAYING) {
    setNextDifficulty(difficulty);
  } else {
    throw new Error("Invalid game state for difficulty change");
  }
}
