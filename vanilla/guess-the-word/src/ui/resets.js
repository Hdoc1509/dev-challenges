import {
  getAllElementsBySelector,
  getElementById,
  getElementBySelector,
} from "@lib/dom";
import { maxResets } from "@/state/resets";
import { CLASSES } from "@/consts/css-classes";

export const $currentResets = getElementById("current-resets", HTMLSpanElement);
export const $maxResets = getElementById("max-resets", HTMLSpanElement);

$maxResets.textContent = `${maxResets}`;

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

    $item.classList.add(CLASSES.STEPPER.STEP);
    $resetsIndicatorsContainer.appendChild($item);
  }
};

export const captureResetsIndicators = () =>
  getAllElementsBySelector(
    `.${CLASSES.RESETS.INDICATOR} > .${CLASSES.STEPPER.STEP}`,
    HTMLSpanElement,
  );

/** @type {HTMLSpanElement[]} */
export let $resetsIndicators = [];

/** @param {HTMLSpanElement[]} $newResetsIndicators */
export const setResetsIndicators = ($newResetsIndicators) =>
  ($resetsIndicators = $newResetsIndicators);
