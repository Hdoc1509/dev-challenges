import { StepIndicatorDynamic } from "@lib/step-indicator/dynamic";
import { getElementById, getElementBySelector } from "@lib/dom";

export const $triesContainer = getElementBySelector(
  ".info > .tries",
  HTMLElement,
);
const $currentTries = getElementById("current-tries", HTMLSpanElement);
const $maxTries = getElementById("max-tries", HTMLSpanElement);

const $indicatorContainer = getElementBySelector(
  `:scope > .${StepIndicatorDynamic.CLASSES.INDICATOR}`,
  HTMLDivElement,
  $triesContainer,
);

export const TriesIndicator = new StepIndicatorDynamic($indicatorContainer, {
  onStep: (newStep) => ($currentTries.textContent = `${newStep}`),
  onQuantity: (newQuantity) => ($maxTries.textContent = `${newQuantity}`),
});
