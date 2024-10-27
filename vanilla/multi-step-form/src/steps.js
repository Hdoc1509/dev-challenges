import { getElementById } from "./utils/dom.js";

const $unsafeStepsContainer = document.querySelector(".steps-container");
if (!($unsafeStepsContainer instanceof HTMLDivElement))
  throw new Error(`missing '.steps-container' element`);

export const $stepsContainer = $unsafeStepsContainer;
export const $currentStepsLabel = getElementById(
  "current-step-label",
  HTMLSpanElement,
);
export const totalSteps = $stepsContainer.querySelectorAll(".step").length;
