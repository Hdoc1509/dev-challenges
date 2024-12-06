import { getElementBySelector } from "@lib/dom";

export const $author = getElementBySelector(
  ".quote__author",
  HTMLHeadingElement,
);

export const $tags = getElementBySelector(".quote__tags", HTMLUListElement);

export const $text = getElementBySelector(".quote__text", HTMLParagraphElement);
