import { getElementById, getElementBySelector } from "@lib/dom";

export const $definition = getElementBySelector(
  ".info .definition",
  HTMLElement,
);

export const $showDefinition = getElementById(
  "show-definition",
  HTMLButtonElement,
);
