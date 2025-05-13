import { getElementById, getElementBySelector } from "@lib/dom";
import { TypingLetterIndex } from "@/state/typing-letter";
import { createLetterLabel } from "./letter-label";
import { $typing } from "./elements";
import { CLASSES } from "@/consts/css-classes";

const $letterTemplate = getElementById("letter-template", HTMLTemplateElement);

/** @type {HTMLInputElement[]} */
const $letterFields = [];

/** @param {number} quantity */
export function createLetterFields(quantity) {
  $letterFields.length = 0;
  $typing.replaceChildren();

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
  $firstLetter.classList.add(CLASSES.TYPING.LETTER__CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
}

export const resetLetterFields = () => {
  const $firstField = $letterFields[0];
  const $currentLetter = $typing.querySelector(
    `:scope .${CLASSES.TYPING.LETTER__CURRENT}`,
  );
  const $currentField = $currentLetter?.querySelector(":scope > input");
  const $usedLetters = $typing.querySelectorAll(
    `:scope .${CLASSES.TYPING.LETTER__CORRECT}, .${CLASSES.TYPING.LETTER__MISTAKEN}`,
  );

  $currentLetter?.classList.remove(CLASSES.TYPING.LETTER__CURRENT);

  $usedLetters.forEach(($letter, idx) => {
    const $field = $letterFields[idx];

    $letter.classList.remove(
      CLASSES.TYPING.LETTER__CORRECT,
      CLASSES.TYPING.LETTER__MISTAKEN,
    );

    $field.readOnly = false;
    $field.disabled = true;
    $field.value = "";
  });
  if ($currentField instanceof HTMLInputElement) $currentField.disabled = true;

  $firstField.parentElement?.classList.add(CLASSES.TYPING.LETTER__CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
};
