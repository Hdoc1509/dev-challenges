import { getElementById, getElementBySelector } from "@lib/dom";
import { CLASSES } from "@/consts/css-classes";

export const $typing = getElementById("typing", HTMLElement);
export const $letterTemplate = getElementById(
  "letter-template",
  HTMLTemplateElement,
);

/** @type {HTMLInputElement[]} */
export let $letterFields;

/** @param {number} quantity */
export function createLetterFields(quantity) {
  while ($typing.firstChild) $typing.removeChild($typing.firstChild);

  for (let i = 0; i < quantity; i++) {
    const $letterClone = /** @type {DocumentFragment} */ (
      $letterTemplate.content.cloneNode(true)
    );
    const $letter = getElementBySelector(
      ".typing__letter",
      HTMLSpanElement,
      $letterClone,
    );

    $letter.setAttribute("data-letter-index", `${i}`);

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

// TODO: add resetLetterFields(), use it in resetGame()
