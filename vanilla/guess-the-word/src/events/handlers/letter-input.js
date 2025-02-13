import { showAlert } from "@lib/alert";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { increaseTries, maxTries, tries } from "@/state/tries";
import { maxResets, gameResets } from "@/state/resets";
import { gameState, setGameState } from "@/state/game-state";
import { handleLetterMistake } from "./letter-mistake";
import { resetGame } from "./reset-game";
import { handleGameOver } from "./game-over";
import { $reset } from "@/ui/actions";
import { CLASSES, DIFFICULTY, GAME_STATE, TRIES } from "@/consts";

/** @param {HTMLInputElement} $currentField */
export function handleLetterInput($currentField) {
  const $currentLetter = /** @type {HTMLSpanElement} */ (
    $currentField.parentElement
  );
  const letterIndex = Number($currentLetter.dataset.letterIndex);
  const enteredLetter = $currentField.value;

  if (enteredLetter === " ") {
    $currentField.value = "";
    return;
  }

  const matches = new RegExp(currentWord[letterIndex], "i").test(enteredLetter);

  if (gameState !== GAME_STATE.PLAYING) setGameState(GAME_STATE.PLAYING);

  if (!matches) {
    increaseTries();

    if (tries === maxTries) {
      if (difficulty === DIFFICULTY.MASTER && gameResets === maxResets)
        return handleGameOver({ $currentField, $currentLetter });

      return resetGame();
    }

    handleLetterMistake({ $currentLetter, enteredLetter });
  }

  const $nextLetter = $currentLetter.nextElementSibling;

  $reset.disabled = false;
  $currentField.disabled = true;
  $currentField.readOnly = true;
  $currentLetter.classList.remove(CLASSES.TYPING.LETTER__CURRENT);

  if ($nextLetter instanceof HTMLSpanElement) {
    const $nextField = /** @type {HTMLInputElement} */ (
      $nextLetter.firstElementChild
    );

    $nextLetter.classList.add(CLASSES.TYPING.LETTER__CURRENT);
    $nextField.disabled = false;
    $nextField.focus();
  } else if (tries === TRIES.NONE) {
    showAlert({ color: "success", text: "🎉 Success!" });
    $reset.disabled = true;
  }
}
