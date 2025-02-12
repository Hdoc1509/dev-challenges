import { CLASSES } from "@/consts";
import { maxTries } from "@/state/tries";
import {
  getAllElementsBySelector,
  getElementById,
  getElementBySelector,
} from "@lib/dom";

export const $currentTries = getElementById("current-tries", HTMLSpanElement);
export const $maxTries = getElementById("max-tries", HTMLSpanElement);

$maxTries.textContent = `${maxTries}`;

const $triesIndicator = getElementBySelector(
  `.${CLASSES.TRIES.INDICATOR}.stepper`,
  HTMLDivElement,
);

// TODO: add custom library for this logic, like used for tabs.js
/** @param {number} quantity */
export const generateTriesIndicators = (quantity) => {
  while ($triesIndicator.firstChild)
    $triesIndicator.removeChild($triesIndicator.firstChild);

  const $fragment = document.createDocumentFragment();

  for (let i = 0; i < quantity - 1; i++) {
    const $item = document.createElement("span");

    $item.classList.add(CLASSES.TRIES.STEP);
    $fragment.appendChild($item);
  }

  $triesIndicator.appendChild($fragment);
};

generateTriesIndicators(maxTries);

export const captureTriesIndicators = () =>
  getAllElementsBySelector(
    `.${CLASSES.TRIES.INDICATOR} > .${CLASSES.TRIES.STEP}`,
    HTMLSpanElement,
  );

export let $triesIndicators = captureTriesIndicators();

/** @param {HTMLSpanElement[]} $newTriesIndicators */
export const setTriesIndicators = ($newTriesIndicators) =>
  ($triesIndicators = $newTriesIndicators);

export const $mistakenLetters = getElementById(
  "mistaken-letters",
  HTMLSpanElement,
);

export const $resetsContainer = getElementBySelector(
  ".game-card .info .resets",
  HTMLElement,
);

const $resetsIndicatorsContainer = getElementBySelector(
  `.${CLASSES.RESETS.INDICATOR}`,
  HTMLDivElement,
);

/** @param {number} quantity */
export const generateResetsIndicators = (quantity) => {
  while ($resetsIndicatorsContainer.firstChild)
    $resetsIndicatorsContainer.removeChild(
      $resetsIndicatorsContainer.firstChild,
    );

  for (let i = 0; i < quantity; i++) {
    const $item = document.createElement("span");

    $item.classList.add(CLASSES.RESETS.STEP);
    $resetsIndicatorsContainer.appendChild($item);
  }
};

export const captureResetsIndicators = () =>
  getAllElementsBySelector(
    `.${CLASSES.RESETS.INDICATOR} > .${CLASSES.RESETS.STEP}`,
    HTMLSpanElement,
  );

/** @type {HTMLSpanElement[]} */
export let $resetsIndicators = [];

/** @param {HTMLSpanElement[]} $newResetsIndicators */
export const setResetsIndicators = ($newResetsIndicators) =>
  ($resetsIndicators = $newResetsIndicators);
