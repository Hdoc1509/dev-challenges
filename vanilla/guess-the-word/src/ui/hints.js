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

const $allHintsContent = getElementById(
  "all-hints-tab-content",
  HTMLDivElement,
);
const $allHintsList = getElementBySelector(
  "#all-hints-tab-content > .hints-list",
  HTMLUListElement,
);
const $correctHintsContent = getElementById(
  "correct-hints-tab-content",
  HTMLDivElement,
);
const $correctHintsList = getElementBySelector(
  "#correct-hints-tab-content > .hints-list",
  HTMLUListElement,
);

/** @param {number} lettersCount */
const createHintsGroup = (lettersCount) => {
  const $item = document.createElement("li");

  $item.classList.add("hint-group");

  for (let i = 0; i < lettersCount; i++) {
    const $letter = document.createElement("span");

    $letter.classList.add("hint");
    $item.appendChild($letter);
  }

  return $item;
};

/**
 * @param {string} enteredLetter
 * @param {{ letterIndex: number, isCorrect: boolean }} options
 */
export const addHint = (enteredLetter, { letterIndex, isCorrect }) => {
  // TODO: remove '.not-yet' logic once fully implemented
  const $notYetAll = $allHintsContent.querySelector(".not-yet");
  const $notYetCorrect = $correctHintsContent.querySelector(".not-yet");

  if ($notYetAll != null) $notYetAll.remove();
  if ($notYetCorrect != null) $notYetCorrect.remove();

  const $allHintsInitialItem = $allHintsList.children[gameResets];
  const $correctHintsInitialItem = $correctHintsList.firstElementChild;
  const lettersCount = currentWord.length;

  if ($allHintsInitialItem == null)
    $allHintsList.appendChild(createHintsGroup(lettersCount));

  if ($correctHintsInitialItem == null)
    $correctHintsList.appendChild(createHintsGroup(lettersCount));

  const $allHintsItem = $allHintsList.children[gameResets];
  const $allHintsLetter = $allHintsItem.children[letterIndex];

  $allHintsLetter.textContent = enteredLetter;
  $allHintsLetter.classList.add(`hint--${isCorrect ? "correct" : "wrong"}`);

  if (isCorrect) {
    const $correctHintsItem = /** @type {HTMLLIElement} */ (
      $correctHintsList.firstElementChild
    );
    const $correctHintsLetter = $correctHintsItem.children[letterIndex];

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
