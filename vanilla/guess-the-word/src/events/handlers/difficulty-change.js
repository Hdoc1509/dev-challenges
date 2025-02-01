import { setDifficulty, setNextDifficulty } from "@/state/difficulty";
import { gameSate } from "@/state/game-state";
import { GAME_STATE } from "@/consts";

/** @param {import("@/consts").Difficulty} difficulty */
export function handleDifficultyChange(difficulty) {
  if (gameSate === GAME_STATE.READY) {
    setDifficulty(difficulty);
    setNextDifficulty(null);
  } else if (gameSate === GAME_STATE.PLAYING) {
    setNextDifficulty(difficulty);
  } else {
    throw new Error("Invalid game state for difficulty change");
  }
}
