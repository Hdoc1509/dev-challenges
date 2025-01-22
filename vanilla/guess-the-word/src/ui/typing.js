import { getAllElementsBySelector, getElementById } from "@lib/dom";

export const $typing = getElementById("typing", HTMLElement);
export const $letterTemplate = getElementById(
  "letter-template",
  HTMLTemplateElement,
);

/** @type {HTMLInputElement[]} */
export let $letterFields;

export function updateLetterFields() {
  $letterFields = getAllElementsBySelector(
    ".typing__letter > input",
    HTMLInputElement,
  );
}
