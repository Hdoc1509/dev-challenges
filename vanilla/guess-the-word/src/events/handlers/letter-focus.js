import { TypingLetterIndex } from "@/state/typing-letter";
import { resetTimer, setTimerDuration, showTimerBar } from "@/ui/timer";
import { isValidLetterField } from "@/ui/typing";
import { Random } from "@/utils/random";
import { handleLetterInput } from "./letter-input";

/** @type {HTMLInputElement | null} */
// NOTE: avoids weird behaviors when focusing more than once on the same input
let $lastFocusedInput = null;
/** @type {AbortController | null} */
let controller = null;

/** @param {FocusEvent} e */
export const handleLetterFocus = (e) => {
  const $target = e.target;

  if (!isValidLetterField($target)) return;

  const letterIdx = TypingLetterIndex.get($target);

  if (letterIdx === 0 || $lastFocusedInput === $target) return;
  if (letterIdx === 1) showTimerBar();

  const timerDuration = Random.intInRange(3, 5);

  controller?.abort();

  controller = new AbortController();

  $lastFocusedInput = $target;
  resetTimer();
  setTimerDuration(timerDuration, () => handleLetterInput($target), {
    controller,
  });
};
