const $unsafeStepsContainer = document.querySelector(".steps-container");
if (!($unsafeStepsContainer instanceof HTMLDivElement))
  throw new Error(`missing '.steps-container' element`);

const $unsafeCurrentStepsLabel = document.getElementById("current-step");
if (!($unsafeCurrentStepsLabel instanceof HTMLElement))
  throw new Error(`missing '#current-step' element`);

export const $stepsContainer = $unsafeStepsContainer;
export const $currentStepsLabel = $unsafeCurrentStepsLabel;
export const totalSteps = $stepsContainer.querySelectorAll(".step").length;