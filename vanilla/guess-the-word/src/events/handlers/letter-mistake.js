import { TriesIndicator } from "@/ui/tries";
import { $mistakenLetters } from "@/ui/mistakes";
import { CLASSES } from "@/consts/css-classes";
import { TRIES } from "@/consts/tries";

/**
 * @param {Object} params
 * @param {HTMLSpanElement} params.$currentLetter
 * @param {string} params.enteredLetter
 * @param {number} params.tries
 */
export function handleLetterMistake({ $currentLetter, enteredLetter, tries }) {
  $currentLetter.classList.add(CLASSES.TYPING.LETTER__MISTAKEN);

  // NOTE: only happens when reached max resets
  if (tries === TRIES.NONE) return;

  const mistakes = $mistakenLetters.textContent;

  TriesIndicator.goNext();
  $mistakenLetters.textContent =
    tries === TRIES.FIRST ? enteredLetter : `${mistakes}, ${enteredLetter}`;
}
