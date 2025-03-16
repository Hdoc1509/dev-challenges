import { setDifficulty } from "@/state/difficulty";
import { generateRandomWord } from "./random-word";
import { applyDifficulty } from "@/utils/difficulty/apply";

/** @param {import("@/consts/difficulty").Difficulty} difficulty */
export async function handleDifficultyChange(difficulty) {
  setDifficulty(difficulty);
  await applyDifficulty(difficulty);
  generateRandomWord();
}
