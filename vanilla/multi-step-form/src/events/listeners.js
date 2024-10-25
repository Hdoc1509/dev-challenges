import {
  handleNameInput,
  handleEmailInput,
} from "./handlers/register-inputs.js";
import { handleTopicCheckboxChange } from "./handlers/topic-checkboxes.js";
import { handleGoNextStep } from "./handlers/steps.js";
import { handleSubmitRegister } from "./handlers/submit-register.js";
import {
  $emailInput,
  $nameInput,
  $registerForm,
  TOPIC_CHECKBOX_SELECTOR,
} from "@/form";
import { $goNextStepButton } from "@/buttons";

export function setupEventListeners() {
  document.addEventListener("change", ({ target }) => {
    if (target instanceof HTMLInputElement) {
      if (target === $nameInput) handleNameInput();

      if (target === $emailInput) handleEmailInput();

      if (target.matches(TOPIC_CHECKBOX_SELECTOR)) handleTopicCheckboxChange();
    }
  });

  $goNextStepButton.addEventListener("click", handleGoNextStep);
  $registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmitRegister();
  });
}
