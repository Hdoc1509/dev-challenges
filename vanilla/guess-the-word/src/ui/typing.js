import { getAllElementsBySelector, getElementById } from "@lib/dom";

export const $typing = getElementById("typing", HTMLElement);
export const $letterTemplate = getElementById(
  "letter-template",
  HTMLTemplateElement,
);

/** @type {HTMLInputElement[]} */
export let $letterFields;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#imported_values_can_only_be_modified_by_the_exporter
export function updateLetterFields() {
  $letterFields = getAllElementsBySelector(
    ".typing__letter > input",
    HTMLInputElement,
  );
}
