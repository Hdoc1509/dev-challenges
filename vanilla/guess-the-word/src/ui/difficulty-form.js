import { getElementById, getElementBySelector } from "@lib/dom";
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

/** @param {Difficulty} difficulty */
export const disableDifficultyOption = (difficulty) => {
  const $label = getElementBySelector(
    `:scope > .radio-group > .label[data-difficulty="${difficulty}"]`,
    HTMLLabelElement,
    $difficultyForm,
  );
  const $option = getElementBySelector(
    `:scope > .radio`,
    HTMLSpanElement,
    $label,
  );
  const $optionInput = getElementBySelector(
    `:scope > .radio__inner`,
    HTMLInputElement,
    $option,
  );

  $label.setAttribute("data-disabled", "");
  $option.setAttribute("data-disabled", "");
  $optionInput.disabled = true;
};
