import { showAlert } from "@lib/alert";
import { difficulty } from "@/state/difficulty";
import { tries } from "@/state/tries";
import { $wordLetters } from "@/ui/word";
import { $currentTries } from "@/ui/tries";
import { $hints } from "@/ui/hints";
import { $reset } from "@/ui/actions";
import { CLASSES, DIFFICULTY } from "@/consts";

/**
 * @param {Object} params
 * @param {HTMLInputElement} params.$currentField
 * @param {HTMLSpanElement} params.$currentLetter
 */
export function handleGameOver({ $currentField, $currentLetter }) {
  showAlert({ color: "error", text: "😔 Game Over!" });
  $reset.disabled = true;
  $currentField.disabled = true;
  $currentField.readOnly = true;
  $currentLetter.classList.remove(CLASSES.TYPING.LETTER__CURRENT);
  $wordLetters.forEach(($letter) => $letter.removeAttribute("data-used"));
  $hints.removeAttribute("data-active");
  if (difficulty === DIFFICULTY.MASTER) $currentTries.textContent = `${tries}`;
}
