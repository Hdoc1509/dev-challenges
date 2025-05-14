import { setIsAlertInitialized } from "@/state/alert";
import { clearUsedLetters } from "@/ui/word";
import { $hints, $hintsContent } from "@/ui/hints";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";

/**
 * @param {Object} params
 * @param {HTMLInputElement} params.$currentField
 * @param {HTMLSpanElement} params.$currentLetter
 */
export function handleGameOver({ $currentField, $currentLetter }) {
  import("@lib/alert").then(({ showAlert }) => {
    setIsAlertInitialized(true);
    showAlert({ color: "error", text: "😔 Game Over!" });
  });
  $reset.disabled = true;
  $currentField.disabled = true;
  $currentField.readOnly = true;
  $currentLetter.classList.remove(CLASSES.TYPING.LETTER__CURRENT);
  clearUsedLetters();
  $hints.classList.add(CLASSES.HIDDEN);
  $hintsContent.classList.add(CLASSES.HIDDEN);
}
