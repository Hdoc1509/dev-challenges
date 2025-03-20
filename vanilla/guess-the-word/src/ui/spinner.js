import { getElementById } from "@lib/dom";

const $spinnerTemplate = getElementById(
  "spinner-template",
  HTMLTemplateElement,
);

export const createSpinner = () => $spinnerTemplate.content.cloneNode(true);
