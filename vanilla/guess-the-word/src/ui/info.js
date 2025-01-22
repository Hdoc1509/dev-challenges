import { getAllElementsBySelector, getElementById } from "@lib/dom";

export const $tries = getElementById("current-tries", HTMLSpanElement);
export const $triesIndicators = getAllElementsBySelector(
  ".tries__indicator > .stepper__step",
  HTMLSpanElement,
);

export const $mistakenLetters = getElementById(
  "mistaken-letters",
  HTMLSpanElement,
);
