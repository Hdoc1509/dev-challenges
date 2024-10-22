import { $goNextStepButton, $submitRegisterButton } from "../buttons";
import { applyInputError, cleanInputError, ERROR } from "../errors";
import {
  $emailInput,
  $emailInputError,
  $nameInput,
  $nameInputError,
} from "../form";
import { EMAIL_REGEX, NAME_REGEX } from "../regex";
import { $currentStepsLabel, $stepsContainer, totalSteps } from "../steps";

// TODO: split into multiple files
// - handlers/inputs
// - handlers/steps
// - handlers/form

export const handleNameInput = () => {
  const name = $nameInput.value;

  if (name === "")
    return applyInputError({
      $input: $nameInput,
      $error: $nameInputError,
      message: ERROR.NAME.MISSING,
    });

  if (name.match(NAME_REGEX) == null)
    return applyInputError({
      $input: $nameInput,
      $error: $nameInputError,
      message: ERROR.NAME.ONLY_LETTERS,
    });

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

export const handleGoNextStep = () => {
  const $currentStep = document.querySelector(".step--current");
  if (!($currentStep instanceof HTMLElement))
    throw new Error(`missing '.step--current' element`);
  const currentStepCounter = Number($currentStep.dataset.step);

  if (currentStepCounter < totalSteps) {
    if ($currentStep.classList.contains("register-step")) {
      const name = $nameInput.value;

      if (name === "") {
        applyInputError({
          $input: $nameInput,
          $error: $nameInputError,
          message: ERROR.NAME.MISSING,
        });
      }

      const email = $emailInput.value;

      if (email === "") {
        applyInputError({
          $input: $emailInput,
          $error: $emailInputError,
          message: ERROR.EMAIL.MISSING,
        });
      }
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
