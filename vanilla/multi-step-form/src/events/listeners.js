import {
  handleNameInput,
  handleEmailInput,
  handleGoNextStep,
  handleSubmitRegister,
  handleTopicCheckboxChange,
} from "./handlers";
import {
  $emailInput,
  $nameInput,
  $registerForm,
  TOPIC_CHECKBOX_SELECTOR,
} from "../form";
import { $goNextStepButton } from "../buttons";

export function setupEventListeners() {
  document.addEventListener("change", ({ target }) => {
    if (target instanceof HTMLInputElement) {
      if (target === $nameInput) handleNameInput();

      if (target === $emailInput) handleEmailInput();

      if (target.matches(TOPIC_CHECKBOX_SELECTOR)) handleTopicCheckboxChange();
    }
  });

  $goNextStepButton.addEventListener("click", handleGoNextStep);
  $registerForm.addEventListener("submit", handleSubmitRegister);
}
