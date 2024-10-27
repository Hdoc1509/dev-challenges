import {
  getAllElementsBySelector,
  getElementById,
  getElementBySelector,
} from "./utils/dom.js";

export const $stepsContainer = getElementBySelector(
  ".steps-container",
  HTMLDivElement,
);

export const $currentStepsLabel = getElementById(
  "current-step-label",
  HTMLSpanElement,
);

export const totalSteps = getAllElementsBySelector(
  ".step",
  HTMLElement,
  $stepsContainer,
).length;
