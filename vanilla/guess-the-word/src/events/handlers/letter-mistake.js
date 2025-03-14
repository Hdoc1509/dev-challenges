import { $currentTries, $triesIndicators } from "@/ui/tries";
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
  const mistakes = $mistakenLetters.textContent;

  $mistakenLetters.textContent =
    tries === TRIES.FIRST ? enteredLetter : `${mistakes}, ${enteredLetter}`;

  $currentTries.textContent = `${tries}`;
  // NOTE: can be undefined if difficulty === MASTER
  $triesIndicators[tries - 1]?.setAttribute("data-completed", "");
  $currentLetter.classList.add(CLASSES.TYPING.LETTER__MISTAKEN);
}
