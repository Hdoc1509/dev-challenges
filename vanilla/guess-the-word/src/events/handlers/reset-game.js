import { resetTries } from "@/state/tries";
import { resetMistakes } from "@/state/mistakes";
import { $mistakenLetters, $tries, $triesIndicators } from "@/ui/info";
import { $letterFields } from "@/ui/typing";
import { $reset } from "@/ui/actions";
import { CLASSES } from "@/consts";

export function resetGame() {
  const $firstField = $letterFields[0];
  const $currentLetter = /** @type {HTMLSpanElement | null} */ (
    document.querySelector(`.${CLASSES.TYPING.LETTER.CURRENT}`)
  );

  resetTries();
  resetMistakes();

  $tries.textContent = "0";
  $triesIndicators.forEach(($item) => $item.removeAttribute("data-completed"));
  $mistakenLetters.textContent = "-";
  $currentLetter?.classList.remove(CLASSES.TYPING.LETTER.CURRENT);
  // TODO: remove "--letter-border-mistaken" from all letters
  // TODO: use a constant for this
  // $currentLetter.style.removeProperty("--letter-border-mistaken");
  $letterFields.forEach(($field) => {
    $field.readOnly = false;
    $field.disabled = true;
    $field.value = "";
  });
  $firstField.parentElement?.classList.add(CLASSES.TYPING.LETTER.CURRENT);
  $firstField.disabled = false;
  $firstField.focus();
  $reset.disabled = true;
}
