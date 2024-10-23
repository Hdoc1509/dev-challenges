const $unsafeStepsContainer = document.querySelector(".steps-container");
if (!($unsafeStepsContainer instanceof HTMLDivElement))
  throw new Error(`missing '.steps-container' element`);

const $unsafeCurrentStepsLabel = document.getElementById("current-step-label");
if (!($unsafeCurrentStepsLabel instanceof HTMLSpanElement))
  throw new Error(`missing '#current-step-label' element`);

export const $stepsContainer = $unsafeStepsContainer;
export const $currentStepsLabel = $unsafeCurrentStepsLabel;
export const totalSteps = $stepsContainer.querySelectorAll(".step").length;
