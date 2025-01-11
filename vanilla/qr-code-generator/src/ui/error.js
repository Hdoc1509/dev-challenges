import { getElementBySelector } from "@lib/dom";

export const $errorDialog = getElementBySelector(".error", HTMLDialogElement);

export const $errorMessage = getElementBySelector(
  ".error__message",
  HTMLParagraphElement,
  $errorDialog,
);

export const $errorClose = getElementBySelector(
  ".error__close",
  HTMLButtonElement,
  $errorDialog,
);
