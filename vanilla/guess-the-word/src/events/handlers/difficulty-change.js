import { setDifficulty } from "@/state/difficulty";
import { words } from "@/state/words";
import { generateRandomWord } from "./random-word";
import { handleDifficultyComplete } from "./difficulty-complete";
import { applyDifficulty } from "@/utils/difficulty/apply";
import { hideCompletedDifficultyMessage } from "@/ui/completed";

/** @param {import("@/consts/difficulty").Difficulty} difficulty */
export async function handleDifficultyChange(difficulty) {
  setDifficulty(difficulty);
  await applyDifficulty(difficulty);
  if (words.length === 0) handleDifficultyComplete();
  else {
    hideCompletedDifficultyMessage();
    generateRandomWord();
  }
}
