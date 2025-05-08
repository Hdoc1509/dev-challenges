import { setDifficulty } from "@/state/difficulty";
import { words } from "@/state/words";
import { generateRandomWord } from "./random-word";
import { applyDifficulty } from "@/utils/difficulty/apply";
import { hideCompletedDifficultyMessage } from "@/ui/completed";

/** @param {import("@/consts/difficulty").Difficulty} difficulty */
export async function handleDifficultyChange(difficulty) {
  setDifficulty(difficulty);
  await applyDifficulty(difficulty);
  if (words.length === 0)
    import("./difficulty-complete").then(({ handleDifficultyComplete }) =>
      handleDifficultyComplete(),
    );
  else {
    hideCompletedDifficultyMessage();
    generateRandomWord();
  }
}
