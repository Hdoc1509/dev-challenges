import { $goNextStepButton, $submitRegisterButton } from "../buttons";
import {
  applyInputError,
  applyTopicsError,
  cleanInputError,
  cleanTopicsError,
  ERROR,
} from "../errors";
import { validateNameInput } from "../validation";
import {
  $emailInput,
  $emailInputError,
  $nameInput,
  $nameInputError,
  $topicCheckboxes,
} from "../form";
import { EMAIL_REGEX } from "../regex";
import { $currentStepsLabel, $stepsContainer, totalSteps } from "../steps";

// TODO: split into multiple files
// - handlers/inputs
// - handlers/steps
// - handlers/form

export const handleNameInput = () => {
  const validation = validateNameInput();

  if (!validation.success) return validation.showError();

  cleanInputError({
    $input: $nameInput,
    $error: $nameInputError,
  });
};

export const handleEmailInput = () => {
  const email = $emailInput.value;

  if (email === "")
    return applyInputError({
      $input: $emailInput,
      $error: $emailInputError,
      message: ERROR.EMAIL.MISSING,
    });

  if (email.match(EMAIL_REGEX) == null)
    return applyInputError({
      $input: $emailInput,
      $error: $emailInputError,
      message: ERROR.EMAIL.INVALID,
    });

  cleanInputError({
    $input: $emailInput,
    $error: $emailInputError,
  });
};

export const handleTopicCheckboxChange = () => {
  const selectedTopics = $topicCheckboxes
    .filter(($checkbox) => $checkbox.checked)
    .map(($checkbox) => $checkbox.value);

  if (selectedTopics.length === 0) return applyTopicsError();

  cleanTopicsError();
};

export const handleGoNextStep = () => {
  const $currentStep = document.querySelector(".step--current");
  if (!($currentStep instanceof HTMLElement))
    throw new Error(`missing '.step--current' element`);
  const currentStepCounter = Number($currentStep.dataset.step);
  let hasErrors = false;

  if (currentStepCounter < totalSteps) {
    if ($currentStep.classList.contains("register-step")) {
      const nameValidation = validateNameInput();

      if (!nameValidation.success) {
        hasErrors = true;
        nameValidation.showError();
      }

      const email = $emailInput.value;

      if (email === "") {
        hasErrors = true;
        applyInputError({
          $input: $emailInput,
          $error: $emailInputError,
          message: ERROR.EMAIL.MISSING,
        });
      }
      if (email.match(EMAIL_REGEX) == null) {
        hasErrors = true;
        applyInputError({
          $input: $emailInput,
          $error: $emailInputError,
          message: ERROR.EMAIL.INVALID,
        });
      }

      if (hasErrors) return;
    }

    if ($currentStep.classList.contains("topics-step")) {
      const selectedTopics = $topicCheckboxes
        .filter(($checkbox) => $checkbox.checked)
        .map(($checkbox) => $checkbox.value);

      if (selectedTopics.length === 0) return applyTopicsError();
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
    $currentStepsLabel.innerText = `${currentStepCounter + 1}`;
  }

  if (currentStepCounter === totalSteps - 1) {
    $goNextStepButton.classList.add("hidden");
    $submitRegisterButton.classList.remove("hidden");
  }
};

export const handleSubmitRegister = () => {
  console.log("submitting response");
};
