import { getElementById, getElementBySelector } from "@lib/dom";
import { TypingLetterIndex } from "@/state/typing-letter";
import { CLASSES } from "@/consts/css-classes";

export const $typing = getElementById("typing", HTMLElement);
export const $letterTemplate = getElementById(
  "letter-template",
  HTMLTemplateElement,
);

/** @type {HTMLInputElement[]} */
let $letterFields;

/** @param {number} quantity */
export function createLetterFields(quantity) {
  $typing.replaceChildren();

  for (let i = 0; i < quantity; i++) {
    const $letterClone = /** @type {DocumentFragment} */ (
      $letterTemplate.content.cloneNode(true)
    );
    const $field = getElementBySelector(
      "input",
      HTMLInputElement,
      $letterClone,
    );

    TypingLetterIndex.set($field, i);
    $typing.appendChild($letterClone);
  }

  const $firstLetter = /** @type {HTMLSpanElement} */ (
    $typing.firstElementChild
  );
  const $firstField = /** @type {HTMLInputElement} */ (
    $firstLetter.firstElementChild
  );

  $firstLetter.classList.add(CLASSES.TYPING.LETTER__CURRENT);
  $firstField.disabled = false;
  $firstField.focus();

  $letterFields = Array.from(
    $typing.querySelectorAll(".typing__letter > input"),
  );
}

/** @type {($target: EventTarget | null) => $target is HTMLInputElement} */
export const isValidLetterField = ($target) =>
  $target instanceof HTMLInputElement &&
  $target.matches(`.${CLASSES.TYPING.LETTER} > input`);

export const resetLetterFields = () => {
  const $firstField = $letterFields[0];
  const $currentLetter = $typing.querySelector(
    `:scope .${CLASSES.TYPING.LETTER__CURRENT}`,
  );
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

  $firstField.parentElement?.classList.add(CLASSES.TYPING.LETTER__CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
};
