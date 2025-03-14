import { getElementById, getElementBySelector } from "@lib/dom";

export const $mistakesContainer = getElementBySelector(
  ".info > .mistakes",
  HTMLElement,
);

export const $mistakenLetters = getElementById(
  "mistaken-letters",
  HTMLSpanElement,
);
