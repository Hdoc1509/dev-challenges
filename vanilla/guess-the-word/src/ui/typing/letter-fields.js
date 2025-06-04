import { getElementById, getElementBySelector } from "@lib/dom";
import { TypingLetterIndex } from "@/state/typing-letter";
import { clearChildren } from "@/utils/dom";
import { createLetterLabel } from "./letter-label";
import { $typing } from "./elements";
import { CLASSES } from "@/consts/css-classes";

const $letterTemplate = getElementById("letter-template", HTMLTemplateElement);

/** @type {HTMLInputElement[]} */
const $letterFields = [];

/** @param {number} quantity */
export function createLetterFields(quantity) {
  $letterFields.length = 0;
  clearChildren($typing);

  for (let idx = 0; idx < quantity; idx++) {
    const $letterClone = /** @type {DocumentFragment} */ (
      $letterTemplate.content.cloneNode(true)
    );
    const $field = getElementBySelector(
      "input",
      HTMLInputElement,
      $letterClone,
    );

    $field.setAttribute("aria-labelledby", `letter-label-${idx}`);
    $field.after(createLetterLabel(idx));
    TypingLetterIndex.set($field, idx);
    $letterFields.push($field);
    $typing.appendChild($letterClone);
  }

  const [$firstField] = $letterFields;
  const $firstLetter = /** @type {HTMLSpanElement} */ (
    $firstField.parentElement
  );

  $typing.classList.remove(CLASSES.HIDDEN);
  $firstLetter.dataset.state = "current";
  $firstField.disabled = false;
  $firstField.focus();
}

export const resetLetterFields = () => {
  const $firstField = $letterFields[0];
  const $usedLetters = $typing.querySelectorAll(
    `:scope > .${CLASSES.TYPING.LETTER}[data-state]:not([data-state=""])`,
  );

  $usedLetters.forEach(($letter, idx) => {
    const $field = $letterFields[idx];

    $letter.removeAttribute("data-state");

    $field.readOnly = false;
    $field.disabled = true;
    $field.value = "";
  });

  $firstField.parentElement?.setAttribute("data-state", "current");
  $firstField.disabled = false;
  $firstField.focus();
};
