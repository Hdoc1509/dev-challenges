import { $currentTries, $triesIndicators } from "@/ui/tries";
import { $mistakenLetters } from "@/ui/mistakes";
import { CLASSES, TRIES } from "@/consts";

/**
 * @param {Object} params
 * @param {string} params.enteredLetter
 * @param {number} params.tries
 */
export function handleLetterMistake({ enteredLetter, tries }) {
  const $newMistakenLetter = document.createElement("span");

  if (tries === TRIES.FIRST) $mistakenLetters.textContent = "";

  $currentTries.textContent = `${tries}`;
  // NOTE: can be undefined if difficulty === MASTER
  $triesIndicators[tries - 1]?.setAttribute("data-completed", "");

  $newMistakenLetter.classList.add(CLASSES.MISTAKES.LETTER);
  $newMistakenLetter.textContent = enteredLetter === "" ? "-" : enteredLetter;
  if (enteredLetter === "")
    $newMistakenLetter.classList.add(CLASSES.MISTAKES.LETTER__EMPTY);
  if (tries > TRIES.FIRST) $mistakenLetters.append(",");
  $mistakenLetters.appendChild($newMistakenLetter);
}
