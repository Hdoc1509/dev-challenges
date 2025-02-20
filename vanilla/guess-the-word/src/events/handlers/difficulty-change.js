import { setDifficulty } from "@/state/difficulty";
import { generateRandomWord } from "./random-word";
import { applyDifficulty } from "@/utils/difficulty/apply";

/** @param {import("@/consts").Difficulty} difficulty */
export function handleDifficultyChange(difficulty) {
  setDifficulty(difficulty);
  applyDifficulty(difficulty);
  generateRandomWord();
}
