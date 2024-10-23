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
  $nameInput.addEventListener("input", handleNameInput);
  $emailInput.addEventListener("input", handleEmailInput);
  document.addEventListener("change", (e) => {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.matches(TOPIC_CHECKBOX_SELECTOR))
        handleTopicCheckboxChange();
    }
  });

  $goNextStepButton.addEventListener("click", handleGoNextStep);
  $registerForm.addEventListener("submit", handleSubmitRegister);
}
