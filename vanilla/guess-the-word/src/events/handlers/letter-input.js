import { currentWord } from "@/state/current-word";
import { increaseTries, maxTries, tries } from "@/state/tries";
import { maxResets, gameResets, implementsMaxResets } from "@/state/resets";
import { TypingLetterIndex } from "@/state/typing-letter";
import { handleLetterMistake } from "./letter-mistake";
import { resetGame } from "./reset-game";
import { handleGameOver } from "./game-over";
import { handleGameSuccess } from "./game-success";
import { showCorrectWord, useLetter } from "@/ui/word";
import { hideTimerBar } from "@/ui/timer";
import { $hints, addHint } from "@/ui/hints";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";
import { TRIES } from "@/consts/tries";

/** @param {HTMLInputElement} $currentField */
export function handleLetterInput($currentField) {
  const $currentLetter = /** @type {HTMLSpanElement} */ (
    $currentField.parentElement
  );
  const letterIndex = /** @type {number}*/ (
    TypingLetterIndex.get($currentField)
  );
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

  addHint(enteredLetter, { letterIndex, isCorrect: isMatch });

  if (!isMatch) {
    if (implementsMaxResets() && gameResets === maxResets) {
      handleLetterMistake({ $currentLetter, enteredLetter, tries });
      handleGameOver({ $currentField, $currentLetter });
      showCorrectWord(); // TODO: move to handleGameOver()
      hideTimerBar();
      return;
    }

    increaseTries();
    handleLetterMistake({ $currentLetter, enteredLetter, tries });

    if (tries === maxTries) return resetGame();
  } else {
    // TODO: move to handleLetterCorrect() in another file
    useLetter(lowercaseLetter);
    $currentLetter.classList.add(CLASSES.TYPING.LETTER__CORRECT);
  }

  if (tries <= TRIES.FIRST && gameResets <= maxResets)
    $hints.setAttribute("data-active", "");

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
    handleGameSuccess();
  } else {
    hideTimerBar();
  }
}
