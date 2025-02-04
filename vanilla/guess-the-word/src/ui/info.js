import { CLASSES, TRIES } from "@/consts";
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

  for (let i = 0; i < TRIES.MAX; i++) {
    const $item = document.createElement("span");

    $item.classList.add(CLASSES.TRIES.STEP);
    $fragment.appendChild($item);
  }

  $triesIndicator.appendChild($fragment);
};

generateTriesIndicators();

export const $triesIndicators = getAllElementsBySelector(
  ".tries__indicator > .stepper__step",
  HTMLSpanElement,
);

export const $mistakenLetters = getElementById(
  "mistaken-letters",
  HTMLSpanElement,
);
