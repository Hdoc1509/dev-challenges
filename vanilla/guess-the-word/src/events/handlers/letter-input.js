import { showAlert } from "@lib/alert";
import { currentWord } from "@/state/current-word";
import { increaseTries, tries } from "@/state/tries";
import { difficulty } from "@/state/difficulty";
import { gameSate, setGameState } from "@/state/game-state";
import { resetGame } from "./reset-game";
import { applyEasyDifficulty } from "@/utils/difficulty/easy";
import { $mistakenLetters, $tries, $triesIndicators } from "@/ui/info";
import { $reset } from "@/ui/actions";
import { CLASSES, DIFFICULTY, GAME_STATE, TRIES } from "@/consts";

/** @param {HTMLInputElement} $currentField */
export function handleLetterInput($currentField) {
  const $currentLetter = /** @type {HTMLSpanElement} */ (
    $currentField.parentElement
  );
  const letterIndex = Number($currentLetter.dataset.letterIndex);
  const enteredLetter = $currentField.value;
  const matches = new RegExp(currentWord[letterIndex], "i").test(enteredLetter);

  if (gameSate !== GAME_STATE.PLAYING) setGameState(GAME_STATE.PLAYING);

  if (!matches) {
    increaseTries();

    if (tries === TRIES.MAX) return resetGame();

    const $mistakenLetter = document.createElement("span");

    if (tries === TRIES.FIRST) $mistakenLetters.textContent = "";

    $tries.textContent = `${tries}`;
    $triesIndicators[tries - 1].setAttribute("data-completed", "");

    if (difficulty === DIFFICULTY.EASY)
      applyEasyDifficulty({
        $mistakenLetter,
        $currentLetter,
        currentTries: tries,
      });

    $mistakenLetter.textContent = enteredLetter;
    if (tries > TRIES.FIRST) $mistakenLetters.append(", ");
    $mistakenLetters.appendChild($mistakenLetter);
  }

  const $nextLetter = $currentLetter.nextElementSibling;

  $reset.disabled = false;
  $currentField.disabled = true;
  $currentField.readOnly = true;
  $currentLetter.classList.remove(CLASSES.TYPING.LETTER.CURRENT);

  if ($nextLetter instanceof HTMLSpanElement) {
    const $nextField = /** @type {HTMLInputElement} */ (
      $nextLetter.firstElementChild
    );

    $nextLetter.classList.add(CLASSES.TYPING.LETTER.CURRENT);
    $nextField.disabled = false;
    $nextField.focus();
  } else if (tries === TRIES.NONE) {
    showAlert({ color: "success", text: "🎉 Success!" });
    $reset.disabled = true;
  }
}
