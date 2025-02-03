import { CLASSES, CSS_VARIABLES, DIFFICULTIES } from "@/consts";

/**
 * @param {Object} params
 * @param {HTMLSpanElement} params.$mistakenLetter
 * @param {HTMLSpanElement} params.$currentLetter
 * @param {number} params.currentTries
 */
export function applyEasyDifficulty({
  $mistakenLetter,
  $currentLetter,
  currentTries,
}) {
  const difficultyIdx = currentTries - 1;
  const color = `var(--difficulty-${DIFFICULTIES[difficultyIdx]})`;

  $mistakenLetter.classList.add(CLASSES.MISTAKES.LETTER);
  $mistakenLetter.style.setProperty(CSS_VARIABLES.MISTAKEN_LETTER.TEXT, color);

  $currentLetter.classList.add(CLASSES.TYPING.LETTER.MISTAKEN);
  $currentLetter.style.setProperty(CSS_VARIABLES.LETTER_BORDER.MISTAKEN, color);
}
