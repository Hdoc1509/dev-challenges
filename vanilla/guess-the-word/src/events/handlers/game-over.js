import { setIsAlertInitialized } from "@/state/alert";
import { clearUsedLetters, showCorrectWord } from "@/ui/word";
import { $hints, $hintsContent } from "@/ui/hints/elements";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";

/** @param {Object} params
 * @param {HTMLInputElement} params.$currentField */
export function handleGameOver({ $currentField }) {
  import("@lib/alert").then(({ showAlert }) => {
    setIsAlertInitialized(true);
    showAlert({ color: "error", text: "😔 Game Over!" });
  });

  clearUsedLetters();
  showCorrectWord();

  $hints.classList.add(CLASSES.HIDDEN);
  $hintsContent.classList.add(CLASSES.HIDDEN);

  $currentField.disabled = true;
  $currentField.readOnly = true;

  $reset.disabled = true;
}
