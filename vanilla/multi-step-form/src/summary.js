import { getElementBySelector } from "@lib/dom";

export const $summaryName = getElementBySelector(
  ".summary-register__name",
  HTMLSpanElement,
);

export const $summaryEmail = getElementBySelector(
  ".summary-register__email",
  HTMLSpanElement,
);

export const $summaryTopicsList = getElementBySelector(
  ".summary-topics__list",
  HTMLUListElement,
);
