import { currentWord } from "@/state/current-word";
import { increaseTries, maxTries, tries } from "@/state/tries";
import { maxResets, gameResets, implementsMaxResets } from "@/state/resets";
import { handleLetterMistake } from "./letter-mistake";
import { resetGame } from "./game-reset";
import { handleGameOver } from "./game-over";
import { handleGameSuccess } from "./game-success";
import { goNextLetter } from "./letter-next";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { getLetter } from "@/utils/get-letter";
import { useLetter } from "@/ui/word";
import { addHint } from "@/ui/hints/add";
import { $hints } from "@/ui/hints/elements";
import { isValidTypingLetter } from "@/ui/typing/validation";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";
import { TRIES } from "@/consts/tries";

/** @param {HTMLInputElement} $currentField
 * @param {{ timerController?: AbortController }} options */
export function handleLetterInput($currentField, { timerController } = {}) {
  const retrievedLetter = getLetter($currentField);
  if (retrievedLetter == null) return;

  const { letterIndex, lowercaseLetter, enteredLetter, $currentLetter } =
    retrievedLetter;
  const isMatch = currentWord[letterIndex] === lowercaseLetter;

  addHint(enteredLetter, { letterIndex, isCorrect: isMatch });

  if (!isMatch) {
    if (InsaneDifficulty.isApplied()) timerController?.abort();

    if (implementsMaxResets() && gameResets === maxResets) {
      handleLetterMistake({ $currentLetter, enteredLetter, tries });
      handleGameOver({ $currentField });
      if (InsaneDifficulty.isApplied())
        import("@/ui/timer").then(({ hideTimerBar }) => hideTimerBar());
      return;
    }

    increaseTries();
    handleLetterMistake({ $currentLetter, enteredLetter, tries });

    if (tries === maxTries) return resetGame();
  } else {
    useLetter(lowercaseLetter);
    $currentLetter.dataset.state = "correct";
  }

  if (tries <= TRIES.FIRST && gameResets <= maxResets)
    $hints.classList.remove(CLASSES.HIDDEN);

  const $nextLetter = $currentLetter.nextElementSibling;

  if (gameResets < maxResets) $reset.disabled = false;
  $currentField.disabled = true;
  $currentField.readOnly = true;

  if (isValidTypingLetter($nextLetter)) goNextLetter($nextLetter);
  else if (tries === TRIES.NONE) handleGameSuccess();
  else if (InsaneDifficulty.isApplied())
    import("@/ui/timer").then(({ hideTimerBar }) => hideTimerBar());
}
