import { showAlert } from "@lib/alert";
import { difficulty } from "@/state/difficulty";
import { tries } from "@/state/tries";
import { $reset } from "@/ui/actions";
import { $currentTries } from "@/ui/info";
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
  if (difficulty === DIFFICULTY.MASTER) $currentTries.textContent = `${tries}`;
}
