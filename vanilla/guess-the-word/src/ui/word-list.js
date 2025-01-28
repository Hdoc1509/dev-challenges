import { getElementById, getElementBySelector } from "@lib/dom";

const $wordList = getElementBySelector(".word-list", HTMLUListElement);

const $wordItemTemplate = getElementById(
  "word-item-template",
  HTMLTemplateElement,
);
