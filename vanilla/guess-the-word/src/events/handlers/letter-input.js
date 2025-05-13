import { currentWord } from "@/state/current-word";
import { increaseTries, maxTries, tries } from "@/state/tries";
import { maxResets, gameResets, implementsMaxResets } from "@/state/resets";
import { handleLetterMistake } from "./letter-mistake";
import { resetGame } from "./reset-game";
import { handleGameOver } from "./game-over";
import { handleGameSuccess } from "./game-success";
import { goNextLetter } from "./go-next-letter";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { getLetter } from "@/utils/get-letter";
import { showCorrectWord, useLetter } from "@/ui/word";
import { $hints, addHint } from "@/ui/hints";
import { isValidTypingLetter } from "@/ui/typing";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";
import { TRIES } from "@/consts/tries";

/** @param {HTMLInputElement} $currentField */
export function handleLetterInput($currentField) {
  const retrievedLetter = getLetter($currentField);
  if (retrievedLetter == null) return;

  const { letterIndex, lowercaseLetter, enteredLetter, $currentLetter } =
    retrievedLetter;
  const isMatch = currentWord[letterIndex] === lowercaseLetter;

  addHint(enteredLetter, { letterIndex, isCorrect: isMatch });

  if (!isMatch) {
    if (implementsMaxResets() && gameResets === maxResets) {
      handleLetterMistake({ $currentLetter, enteredLetter, tries });
      handleGameOver({ $currentField, $currentLetter });
      showCorrectWord(); // TODO: move to handleGameOver()
      if (InsaneDifficulty.isApplied())
        import("@/ui/timer").then(({ hideTimerBar }) => hideTimerBar());
      return;
    }

    increaseTries();
    handleLetterMistake({ $currentLetter, enteredLetter, tries });

    if (tries === maxTries) return resetGame();
  } else {
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

  if (isValidTypingLetter($nextLetter)) goNextLetter($nextLetter);
  else if (tries === TRIES.NONE) handleGameSuccess();
  else if (InsaneDifficulty.isApplied())
    import("@/ui/timer").then(({ hideTimerBar }) => hideTimerBar());
}
