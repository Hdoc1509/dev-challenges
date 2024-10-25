import { $goNextStepButton, $submitRegisterButton } from "@/buttons";
import { validateNameInput } from "@/validation/register/name.js";
import { validateEmailInput } from "@/validation/register/email.js";
import { validateTopicCheckboxes } from "@/validation/topics.js";
import { $currentStepsLabel, $stepsContainer, totalSteps } from "@/steps";

export const handleGoNextStep = () => {
  const $currentStep = document.querySelector(".step--current");
  if (!($currentStep instanceof HTMLElement))
    throw new Error(`missing '.step--current' element`);
  const currentStepCounter = Number($currentStep.dataset.step);

  if (currentStepCounter < totalSteps) {
    if ($currentStep.classList.contains("register-step")) {
      const nameValidation = validateNameInput();
      let hasErrors = false;

      if (!nameValidation.success) {
        hasErrors = true;
        nameValidation.showError();
      }

      const emailValidation = validateEmailInput();

      if (!emailValidation.success) {
        hasErrors = true;
        emailValidation.showError();
      }

      if (hasErrors) return;
    }

    if ($currentStep.classList.contains("topics-step")) {
      const validation = validateTopicCheckboxes();

      if (!validation.success) return validation.showError();
    }

    const $currentStepperItem = document.querySelector(
      `.stepper__step[data-step="${currentStepCounter}"]`,
    );
    if (!($currentStepperItem instanceof HTMLSpanElement))
      throw new Error(`missing '.stepper__step' element`);

    $stepsContainer.style.setProperty(
      "--_step-counter",
      `${currentStepCounter + 1}`,
    );
    $currentStep.classList.remove("step--current");
    $currentStep.nextElementSibling?.classList.add("step--current");
    $currentStepperItem.removeAttribute("data-current");
    $currentStepperItem.setAttribute("data-completed", "");
    $currentStepperItem.nextElementSibling?.setAttribute("data-current", "");
    $currentStepsLabel.textContent = `${currentStepCounter + 1}`;
  }

  if (currentStepCounter === totalSteps - 1) {
    $goNextStepButton.classList.add("hidden");
    $submitRegisterButton.classList.remove("hidden");
  }
};
