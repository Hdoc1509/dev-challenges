import { setNextDifficulty } from "@/state/difficulty";
import { gameState } from "@/state/game-state";
import { handleGameReady } from "./game-ready";
import { GAME_STATE } from "@/consts";

/** @param {import("@/consts").Difficulty} difficulty */
export function handleDifficultyChange(difficulty) {
  // TODO: always generate a new word after `handleGameReady()` is called
  // this will simplify calling difficulty applier functions in `generateRandomWord()`
  if (gameState === GAME_STATE.READY) handleGameReady({ difficulty });
  else if (gameState === GAME_STATE.PLAYING) {
    setNextDifficulty(difficulty);
  } else {
    throw new Error("Invalid game state for difficulty change");
  }
}
