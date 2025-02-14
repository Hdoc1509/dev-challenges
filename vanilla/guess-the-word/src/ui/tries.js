import {
  getAllElementsBySelector,
  getElementById,
  getElementBySelector,
} from "@lib/dom";
import { maxTries } from "@/state/tries";
import { CLASSES } from "@/consts";

export const $currentTries = getElementById("current-tries", HTMLSpanElement);
export const $maxTries = getElementById("max-tries", HTMLSpanElement);

$maxTries.textContent = `${maxTries}`;

const $triesIndicator = getElementBySelector(
  `.${CLASSES.TRIES.INDICATOR}.stepper`,
  HTMLDivElement,
);

/** @param {number} quantity */
export const generateTriesIndicators = (quantity) => {
  // TODO: add custom library to handle this logic, like used for tabs.js
  while ($triesIndicator.firstChild)
    $triesIndicator.removeChild($triesIndicator.firstChild);

  for (let i = 0; i < quantity - 1; i++) {
    const $item = document.createElement("span");

    $item.classList.add(CLASSES.STEPPER.STEP);
    $triesIndicator.appendChild($item);
  }
};

generateTriesIndicators(maxTries);

export const captureTriesIndicators = () =>
  getAllElementsBySelector(
    `.${CLASSES.TRIES.INDICATOR} > .${CLASSES.STEPPER.STEP}`,
    HTMLSpanElement,
  );

export let $triesIndicators = captureTriesIndicators();

/** @param {HTMLSpanElement[]} $newTriesIndicators */
export const setTriesIndicators = ($newTriesIndicators) =>
  ($triesIndicators = $newTriesIndicators);
