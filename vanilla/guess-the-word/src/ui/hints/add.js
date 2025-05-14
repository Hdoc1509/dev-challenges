import { currentWord } from "@/state/current-word";
import { gameResets } from "@/state/resets";
import { $allHintsList, $correctHintsList } from "./elements";

/** @param {number} lettersCount */
const createHintsGroup = (lettersCount) => {
  const $group = document.createElement("li");

  $group.classList.add("hint-group");

  for (let i = 0; i < lettersCount; i++) {
    const $letter = document.createElement("span");

    $letter.classList.add("hint");
    $group.appendChild($letter);
  }

  return $group;
};

/** @param {string} enteredLetter
 * @param {{ letterIndex: number, isCorrect: boolean }} options */
export const addHint = (enteredLetter, { letterIndex, isCorrect }) => {
  const lettersCount = currentWord.length;

  if ($allHintsList.children[gameResets] == null)
    $allHintsList.appendChild(createHintsGroup(lettersCount));
  if ($correctHintsList.firstElementChild == null)
    $correctHintsList.appendChild(createHintsGroup(lettersCount));

  const $allHintsGroup = $allHintsList.children[gameResets];
  const $allHintsLetter = $allHintsGroup.children[letterIndex];

  $allHintsLetter.textContent = enteredLetter;
  $allHintsLetter.classList.add(`hint--${isCorrect ? "correct" : "wrong"}`);

  if (isCorrect) {
    const $correctHintsGroup = /** @type {HTMLLIElement} */ (
      $correctHintsList.firstElementChild
    );
    const $correctHintsLetter = $correctHintsGroup.children[letterIndex];

    $correctHintsLetter.textContent = enteredLetter;
    $correctHintsLetter.classList.add("hint--correct");
  }
};
