import { getElementBySelector } from "@lib/dom";

export const $notes = getElementBySelector(".info .notes", HTMLElement);

export const $openNotes = getElementBySelector(
  ".info .notes__open",
  HTMLButtonElement,
  $notes,
);

const $notesContent = getElementBySelector(
  ".info .notes__content",
  HTMLElement,
  $notes,
);
