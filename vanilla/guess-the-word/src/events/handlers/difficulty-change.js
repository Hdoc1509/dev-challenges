import { setDifficulty, setNextDifficulty } from "@/state/difficulty";
import { gameSate } from "@/state/game-state";
import { applyHardDifficulty } from "@/utils/difficulty/hard";
import { DIFFICULTY, GAME_STATE } from "@/consts";

/** @param {import("@/consts").Difficulty} difficulty */
const handleReadyState = (difficulty) => {
  setDifficulty(difficulty);
  setNextDifficulty(null);

  if (difficulty === DIFFICULTY.HARD) return applyHardDifficulty();
};

/** @param {import("@/consts").Difficulty} difficulty */
const handlePlayingState = (difficulty) => {
  setNextDifficulty(difficulty);
};

/** @param {import("@/consts").Difficulty} difficulty */
export function handleDifficultyChange(difficulty) {
  if (gameSate === GAME_STATE.READY) return handleReadyState(difficulty);
  if (gameSate === GAME_STATE.PLAYING) return handlePlayingState(difficulty);

  throw new Error("Invalid game state for difficulty change");
}
