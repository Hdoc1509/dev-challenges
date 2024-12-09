import { getElementBySelector } from "@lib/dom";

export const $quote = getElementBySelector(".quote", HTMLDivElement);

export const $error = getElementBySelector(
  ".quote__error",
  HTMLParagraphElement,
);

export const $author = getElementBySelector(
  ".quote__author",
  HTMLHeadingElement,
);

export const $tags = getElementBySelector(".quote__tags", HTMLUListElement);

export const $text = getElementBySelector(".quote__text", HTMLParagraphElement);
