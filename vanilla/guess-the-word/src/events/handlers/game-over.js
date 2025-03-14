import { showAlert } from "@lib/alert";
import { $wordLetters } from "@/ui/word";
import { $hints, $hintsContent } from "@/ui/hints";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";

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
  $hintsContent.removeAttribute("data-active");
}
