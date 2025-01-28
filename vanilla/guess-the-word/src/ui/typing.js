import { getAllElementsBySelector, getElementById } from "@lib/dom";

export const $typing = getElementById("typing", HTMLElement);
export const $letterTemplate = getElementById(
  "letter-template",
  HTMLTemplateElement,
);

/** @type {HTMLInputElement[]} */
export let $letterFields;

/** @param {HTMLInputElement[]} $fields */
export const setLetterFields = ($fields) => ($letterFields = $fields);

export const captureLetterFields = () =>
  getAllElementsBySelector(".typing__letter > input", HTMLInputElement);
