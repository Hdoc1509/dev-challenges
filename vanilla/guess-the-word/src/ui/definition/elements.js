import { getElementBySelector } from "@lib/dom";

export const $definitionSection = getElementBySelector(
  ".info .definition",
  HTMLElement,
);

export const $showDefinition = getElementBySelector(
  ".info .definition__open",
  HTMLButtonElement,
);
