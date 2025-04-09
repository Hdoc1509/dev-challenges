import { getElementById } from "@lib/dom";
import { DIFFICULTIES, DIFFICULTY } from "@/consts/difficulty";
/** @typedef {import("@/consts/difficulty").Difficulty} Difficulty */

export const $difficultyForm = getElementById(
  "difficulty-form",
  HTMLFormElement,
);

export const getSelectedDifficulty = () => {
  const data = new FormData($difficultyForm);
  const difficulty = data.get("difficulty");

  if (
    typeof difficulty !== "string" ||
    !DIFFICULTIES.has(/** @type {Difficulty} */ (difficulty))
  )
    return DIFFICULTY.NORMAL;
  return /** @type {Difficulty} */ (difficulty);
};
