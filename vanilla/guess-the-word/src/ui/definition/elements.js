import { getElementBySelector } from "@lib/dom";

export const $definitionSection = getElementBySelector(
  ".info .definition",
  HTMLElement,
);

export const $showDefinition = getElementBySelector(
  ":scope > .button",
  HTMLButtonElement,
  $definitionSection,
);
