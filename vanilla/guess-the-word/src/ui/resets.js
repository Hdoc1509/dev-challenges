import { StepIndicator } from "@lib/step-indicator";
import { getElementById, getElementBySelector } from "@lib/dom";

const $currentResets = getElementById("current-resets", HTMLSpanElement);

export const $resetsContainer = getElementBySelector(
  ".game-card .info .resets",
  HTMLElement,
);

const $indicatorContainer = getElementBySelector(
  `:scope > .${StepIndicator.CLASSES.INDICATOR}`,
  HTMLDivElement,
  $resetsContainer,
);

export const ResetsIndicator = new StepIndicator($indicatorContainer, {
  onStep: (newStep) => ($currentResets.textContent = `${newStep}`),
});
