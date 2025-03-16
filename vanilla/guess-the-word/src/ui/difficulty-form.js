import { getElementById } from "@lib/dom";

export const $difficultyForm = getElementById(
  "difficulty-form",
  HTMLFormElement,
);

export const getSelectedDifficulty = () => {
  const data = new FormData($difficultyForm);
  const difficulty = data.get("difficulty");

  if (typeof difficulty !== "string")
    throw new Error("Difficulty is not a string");

  return /** @type {import("@/consts/difficulty").Difficulty} */ (difficulty);
};
