import { tries } from "@/state/tries";
import { difficulty } from "@/state/difficulty";
import { applyEasyDifficulty } from "@/utils/difficulty/easy";
import { $currentTries, $triesIndicators } from "@/ui/tries";
import { $mistakenLetters } from "@/ui/mistakes";
import { CLASSES, DIFFICULTY, TRIES } from "@/consts";

/**
 * @param {Object} params
 * @param {HTMLSpanElement} params.$currentLetter
 * @param {string} params.enteredLetter
 */
export function handleLetterMistake({ $currentLetter, enteredLetter }) {
  const $newMistakenLetter = document.createElement("span");

  if (tries === TRIES.FIRST) $mistakenLetters.textContent = "";

  $currentTries.textContent = `${tries}`;
  // NOTE: can be undefined if difficulty === MASTER
  $triesIndicators[tries - 1]?.setAttribute("data-completed", "");

  if (difficulty === DIFFICULTY.EASY)
    applyEasyDifficulty({
      $mistakenLetter: $newMistakenLetter,
      $currentLetter,
      currentTries: tries,
    });

  $newMistakenLetter.classList.add(CLASSES.MISTAKES.LETTER);
  $newMistakenLetter.textContent = enteredLetter === "" ? "-" : enteredLetter;
  if (enteredLetter === "")
    $newMistakenLetter.classList.add(CLASSES.MISTAKES.LETTER__EMPTY);
  if (tries > TRIES.FIRST) $mistakenLetters.append(",");
  $mistakenLetters.appendChild($newMistakenLetter);
}
