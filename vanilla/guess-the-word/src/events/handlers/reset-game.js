import { resetTries } from "@/state/tries";
import { nextDifficulty } from "@/state/difficulty";
import { setGameState } from "@/state/game-state";
import { handleGameReady } from "./game-ready";
import { $mistakenLetters, $currentTries, $triesIndicators } from "@/ui/info";
import { $letterFields, $typing } from "@/ui/typing";
import { $reset } from "@/ui/actions";
import { CLASSES, CSS_VARIABLES, GAME_STATE } from "@/consts";

export function resetGame() {
  const $firstField = $letterFields[0];
  const $currentLetter = /** @type {HTMLSpanElement | null} */ (
    document.querySelector(`.${CLASSES.TYPING.LETTER__CURRENT}`)
  );
  /** @type {NodeListOf<HTMLSpanElement>} */
  const $typingMistakenLetters = $typing.querySelectorAll(
    `.${CLASSES.TYPING.LETTER__MISTAKEN}`,
  );

  resetTries();
  setGameState(GAME_STATE.READY);

  if (nextDifficulty != null) handleGameReady({ difficulty: nextDifficulty });

  $currentTries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  $mistakenLetters.textContent = "-";
  $currentLetter?.classList.remove(CLASSES.TYPING.LETTER__CURRENT);
  $typingMistakenLetters.forEach(($letter) => {
    $letter.classList.remove(CLASSES.TYPING.LETTER__MISTAKEN);
    $letter.style.removeProperty(CSS_VARIABLES.LETTER_BORDER.MISTAKEN);
  });
  $letterFields.forEach(($field) => {
    $field.readOnly = false;
    $field.disabled = true;
    $field.value = "";
  });
  $firstField.parentElement?.classList.add(CLASSES.TYPING.LETTER__CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
  $reset.disabled = true;
}
