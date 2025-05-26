import { TypingLetterIndex } from "@/state/typing-letter";
import { InsaneCountdownBar } from "@/ui/insane-countdown-bar";
import { isValidLetterField } from "@/ui/typing/validation";
import { Random } from "@/utils/random";
import { handleLetterInput } from "./letter-input";

/** @type {HTMLInputElement | null} */
// NOTE: avoids weird behaviors when focusing more than once on the same input
let $lastFocusedInput = null;

export const resetFocusedInput = () => ($lastFocusedInput = null);

/** @param {FocusEvent} e */
export const handleLetterFocus = (e) => {
  const $target = e.target;

  if (
    !isValidLetterField($target) ||
    TypingLetterIndex.get($target) === 0 ||
    $lastFocusedInput === $target
  )
    return;

  const timerDuration = Random.intInRange(3, 5);

  $lastFocusedInput = $target;

  InsaneCountdownBar.start({
    duration: timerDuration,
    onEnd: () => handleLetterInput($target),
  });
};
