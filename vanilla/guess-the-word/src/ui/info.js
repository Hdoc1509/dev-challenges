import { CLASSES } from "@/consts";
import { maxTries } from "@/state/tries";
import {
  getAllElementsBySelector,
  getElementById,
  getElementBySelector,
} from "@lib/dom";

export const $tries = getElementById("current-tries", HTMLSpanElement);
const $triesIndicator = getElementBySelector(
  `.${CLASSES.TRIES.INDICATOR}.stepper`,
  HTMLDivElement,
);

const generateTriesIndicators = () => {
  const $fragment = document.createDocumentFragment();

  for (let i = 0; i < maxTries - 1; i++) {
    const $item = document.createElement("span");

    $item.classList.add(CLASSES.TRIES.STEP);
    $fragment.appendChild($item);
  }

  $triesIndicator.appendChild($fragment);
};

generateTriesIndicators();

export const $triesIndicators = getAllElementsBySelector(
  `.${CLASSES.TRIES.INDICATOR} > .${CLASSES.TRIES.STEP}`,
  HTMLSpanElement,
);

export const $mistakenLetters = getElementById(
  "mistaken-letters",
  HTMLSpanElement,
);
