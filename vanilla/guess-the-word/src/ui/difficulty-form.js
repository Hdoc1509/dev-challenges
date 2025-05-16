import { getElementById, getElementBySelector } from "@lib/dom";
import { DIFFICULTIES, DIFFICULTY } from "@/consts/difficulty";

const INPUT_OPTION_SELECTOR = ".radio-group"
  .concat("> .label")
  .concat("> .radio")
  .concat('> .radio__inner[name="difficulty"]');

const $difficultyForm = getElementById("difficulty-form", HTMLFormElement);

/** @param {import("@/consts/difficulty").Difficulty} difficulty */
const createInputOptionSelector = (difficulty) =>
  `:scope > ${INPUT_OPTION_SELECTOR}[value="${difficulty}"]`;

export const getSelectedDifficulty = () => {
  const data = new FormData($difficultyForm);
  const difficulty = data.get("difficulty");

  if (
    typeof difficulty !== "string" ||
    !DIFFICULTIES.has(
      /** @type {import("@/consts/difficulty").Difficulty} */ (difficulty),
    )
  )
    return DIFFICULTY.NORMAL;
  return /** @type {import("@/consts/difficulty").Difficulty} */ (difficulty);
};

/** @param {import("@/consts/difficulty").Difficulty} difficulty */
export const disableDifficultyOption = (difficulty) => {
  const $optionInput = getElementBySelector(
    createInputOptionSelector(difficulty),
    HTMLInputElement,
    $difficultyForm,
  );
  const $option = $optionInput.parentElement;
  if (!($option instanceof HTMLSpanElement)) return;
  const $label = $option.parentElement;
  if (!($label instanceof HTMLLabelElement)) return;

  $label.setAttribute("data-disabled", "");
  $option.setAttribute("data-disabled", "");
  $optionInput.disabled = true;
};
