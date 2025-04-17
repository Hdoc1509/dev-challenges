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
const createHintsGroup = (lettersCount, { noCounter = false } = {}) => {
  const $group = document.createElement("li");
  const $content = document.createElement("section");

  $group.classList.add("hint-group");
  $content.classList.add("hint-group__content");

  if (noCounter) $group.classList.add("hint-group--no-counter");

  for (let i = 0; i < lettersCount; i++) {
    const $letter = document.createElement("span");

    $letter.classList.add("hint");
    $content.appendChild($letter);
  }

  $group.appendChild($content);

  return $group;
};

/**
 * @param {string} enteredLetter
 * @param {{ letterIndex: number, isCorrect: boolean }} options
 */
export const addHint = (enteredLetter, { letterIndex, isCorrect }) => {
  const $allHintsInitialItem = $allHintsList.children[gameResets];
  const $correctHintsInitialItem = $correctHintsList.firstElementChild;
  const lettersCount = currentWord.length;

  if ($allHintsInitialItem == null)
    $allHintsList.appendChild(createHintsGroup(lettersCount));

  if ($correctHintsInitialItem == null)
    $correctHintsList.appendChild(
      createHintsGroup(lettersCount, { noCounter: true }),
    );

  const $allHintsGroup = $allHintsList.children[gameResets];
  const $allHintsContent = $allHintsGroup.children[0];
  const $allHintsLetter = $allHintsContent.children[letterIndex];

  $allHintsLetter.textContent = enteredLetter;
  $allHintsLetter.classList.add(`hint--${isCorrect ? "correct" : "wrong"}`);

  if (isCorrect) {
    const $correctHintsGroup = /** @type {HTMLLIElement} */ (
      $correctHintsList.firstElementChild
    );
    const $correctHintsContent = $correctHintsGroup.children[0];
    const $correctHintsLetter = $correctHintsContent.children[letterIndex];

    $correctHintsLetter.textContent = enteredLetter;
    $correctHintsLetter.classList.add("hint--correct");
  }
};

export const clearHints = () => {
  while ($allHintsList.firstChild)
    $allHintsList.removeChild($allHintsList.firstChild);
  while ($correctHintsList.firstChild)
    $correctHintsList.removeChild($correctHintsList.firstChild);
};
