import { getElementBySelector } from "@lib/dom";
import { $letterTemplate, $typing } from "@/ui/typing";
import { CLASSES } from "@/consts";

/** @param {number} quantity */
export function createLetterFields(quantity) {
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

  $firstLetter.classList.add(CLASSES.TYPING_LETTER_CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
}