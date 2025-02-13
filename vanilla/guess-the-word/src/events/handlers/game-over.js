import { showAlert } from "@lib/alert";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts";

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
}
