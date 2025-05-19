import { getElementById } from "@lib/dom";

const $spinnerTemplate = getElementById(
  "spinner-template",
  HTMLTemplateElement,
);

export const createSpinner = () => $spinnerTemplate.content.cloneNode(true);

/** @param {HTMLElement[]} $elements */
export const addSpinner = (...$elements) => {
  for (const $element of $elements)
    if ($element.querySelector(":scope > .spinner") == null)
      $element.appendChild(createSpinner());
};

/** @param {HTMLElement[]} $elements */
export const removeSpinner = (...$elements) => {
  for (const $element of $elements)
    $element.querySelector(":scope > .spinner")?.remove();
};
