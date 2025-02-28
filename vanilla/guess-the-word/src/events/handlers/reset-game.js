import { resetTries } from "@/state/tries";
import { difficulty } from "@/state/difficulty";
import { gameResets, increaseGameResets } from "@/state/resets";
import { implementsMaxResets } from "@/utils/max-resets";
import { $wordLetters } from "@/ui/word";
import { $currentTries, $triesIndicators } from "@/ui/tries";
import { $mistakenLetters } from "@/ui/mistakes";
import { $currentResets, $resetsIndicators } from "@/ui/resets";
import { hideTimerBar } from "@/ui/timer";
import { $letterFields, $typing } from "@/ui/typing";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts";

export function resetGame() {
  const $firstField = $letterFields[0];
  const $currentLetter = /** @type {HTMLSpanElement | null} */ (
    document.querySelector(`.${CLASSES.TYPING.LETTER__CURRENT}`)
  );
  /** @type {NodeListOf<HTMLSpanElement>} */
  const $typingLetters = $typing.querySelectorAll(`.${CLASSES.TYPING.LETTER}`);

  resetTries();
  hideTimerBar();

  $wordLetters.forEach(($letter) => $letter.removeAttribute("data-used"));
  $currentTries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  if (implementsMaxResets({ difficulty })) {
    increaseGameResets();
    $currentResets.textContent = `${gameResets}`;
    $resetsIndicators[gameResets - 1].setAttribute("data-completed", "");
  }
  $mistakenLetters.textContent = "-";
  $currentLetter?.classList.remove(CLASSES.TYPING.LETTER__CURRENT);
  $typingLetters.forEach(($letter) => {
    $letter.classList.remove(
      CLASSES.TYPING.LETTER__MISTAKEN,
      CLASSES.TYPING.LETTER__CORRECT,
    );
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
