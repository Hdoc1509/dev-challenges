import { getElementById, getElementBySelector } from "@lib/dom";
import { gameResets } from "@/state/resets";
import { currentWord } from "@/state/current-word";
import { Tabs } from "@/tabs";

export const $hints = getElementBySelector(".info .hints", HTMLElement);

export const $hintsTrigger = getElementBySelector(
  ".menu-trigger",
  HTMLButtonElement,
  $hints,
);
export const $hintsTriggerLabel = getElementBySelector(
  ".menu-trigger__label",
  HTMLElement,
  $hintsTrigger,
);

export const $hintsContent = getElementBySelector(
  ".hints__content",
  HTMLElement,
  $hints,
);

const $hintsTabNav = getElementById("hints-nav", HTMLElement);
const $hintsTabContent = getElementById("hints-menu-content", HTMLElement);

export const HintsTabs = new Tabs({
  $nav: $hintsTabNav,
  $content: $hintsTabContent,
});

const $allHintsList = getElementBySelector(
  "#all-hints-tab-content > .hints-list",
  HTMLUListElement,
);
const $correctHintsList = getElementBySelector(
  "#correct-hints-tab-content > .hints-list",
  HTMLUListElement,
);

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

/**
 * @param {string} enteredLetter
 * @param {{ letterIndex: number, isCorrect: boolean }} options
 */
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

export const clearHints = () => {
  $allHintsList.replaceChildren();
  $correctHintsList.replaceChildren();
};
