import { getElementById, getElementBySelector } from "@lib/dom";
import { TypingLetterIndex } from "@/state/typing-letter";
import { CLASSES } from "@/consts/css-classes";

export const $typing = getElementById("typing", HTMLElement);
export const $letterTemplate = getElementById(
  "letter-template",
  HTMLTemplateElement,
);

/** @type {HTMLInputElement[]} */
const $letterFields = [];

// TODO: split into ./letter-fields.js and ./validation.js

/** @param {number} quantity */
export function createLetterFields(quantity) {
  $letterFields.length = 0;
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
    // TODO: move logic to insert hidden label to a util
    const $hiddenLabel = document.createElement("span");

    $field.setAttribute("aria-labelledby", `letter-label-${i}`);
    $hiddenLabel.textContent = `Letter ${i + 1}`;
    $hiddenLabel.classList.add("visually-hidden");
    $hiddenLabel.setAttribute("id", `letter-label-${i}`);
    $field.after($hiddenLabel);
    TypingLetterIndex.set($field, i);
    $letterFields.push($field);
    $typing.appendChild($letterClone);
  }

  const [$firstField] = $letterFields;
  const $firstLetter = /** @type {HTMLSpanElement} */ (
    $firstField.parentElement
  );

  $typing.setAttribute("data-active", "");
  $firstLetter.classList.add(CLASSES.TYPING.LETTER__CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
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

/** @param {Element | null} $target
 * @returns {$target is HTMLSpanElement} */
export const isValidTypingLetter = ($target) =>
  $target instanceof HTMLSpanElement &&
  $target.matches(`.${CLASSES.TYPING.LETTER}`);
