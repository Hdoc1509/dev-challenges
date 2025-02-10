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

const generateTriesIndicators = () => {
  while ($triesIndicator.firstChild)
    $triesIndicator.removeChild($triesIndicator.firstChild);

  const $fragment = document.createDocumentFragment();

  for (let i = 0; i < maxTries - 1; i++) {
    const $item = document.createElement("span");

    $item.classList.add(CLASSES.TRIES.STEP);
    $fragment.appendChild($item);
  }

  $triesIndicator.appendChild($fragment);
};

generateTriesIndicators();

// TODO: $triesIndicators should be retrieved dynamically
export const $triesIndicators = getAllElementsBySelector(
  `.${CLASSES.TRIES.INDICATOR} > .${CLASSES.TRIES.STEP}`,
  HTMLSpanElement,
);

export const $mistakenLetters = getElementById(
  "mistaken-letters",
  HTMLSpanElement,
);
