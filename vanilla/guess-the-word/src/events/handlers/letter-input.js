import { showAlert } from "@lib/alert";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { increaseTries, maxTries, tries } from "@/state/tries";
import { maxResets, gameResets } from "@/state/resets";
import { handleLetterMistake } from "./letter-mistake";
import { resetGame } from "./reset-game";
import { handleGameOver } from "./game-over";
import { setWordCompleted, useLetter } from "@/ui/word";
import { implementsMaxResets } from "@/utils/max-resets";
import { hideTimerBar } from "@/ui/timer";
import { $reset } from "@/ui/actions";
import { CLASSES, TRIES } from "@/consts";

/** @param {HTMLInputElement} $currentField */
export function handleLetterInput($currentField) {
  const $currentLetter = /** @type {HTMLSpanElement} */ (
    $currentField.parentElement
  );
  const letterIndex = Number($currentLetter.dataset.letterIndex);
  const enteredLetter = $currentField.value;
  const lowercaseLetter = enteredLetter.toLowerCase();

  if (
    enteredLetter !== "" &&
    (enteredLetter === " " || !/[a-z]/.test(lowercaseLetter))
  ) {
    $currentField.value = "";
    return;
  }

  const isMatch = currentWord[letterIndex] === lowercaseLetter;

  if (!isMatch) {
    increaseTries();

    if (tries === maxTries) {
      if (implementsMaxResets({ difficulty }) && gameResets === maxResets) {
        handleLetterMistake({ enteredLetter, tries });
        handleGameOver({ $currentField, $currentLetter });
        hideTimerBar();
        return;
      }

      return resetGame();
    }

    handleLetterMistake({ enteredLetter, tries });
  } else {
    useLetter(lowercaseLetter);
  }

  const $nextLetter = $currentLetter.nextElementSibling;

  if (gameResets < maxResets) $reset.disabled = false;
  $currentField.disabled = true;
  $currentField.readOnly = true;
  $currentLetter.classList.remove(CLASSES.TYPING.LETTER__CURRENT);

  // TODO: also check if matches '.typing__letter' class
  if ($nextLetter instanceof HTMLSpanElement) {
    const $nextField = /** @type {HTMLInputElement} */ (
      $nextLetter.firstElementChild
    );

    $nextLetter.classList.add(CLASSES.TYPING.LETTER__CURRENT);
    $nextField.disabled = false;
    $nextField.focus();
  } else if (tries === TRIES.NONE) {
    showAlert({ color: "success", text: "🎉 Success!" });
    hideTimerBar();
    $reset.disabled = true;
    setWordCompleted();
  }
}
