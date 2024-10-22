import {
  handleNameInput,
  handleEmailInput,
  handleGoNextStep,
  handleSubmitRegister,
} from "./handlers";
import { $emailInput, $nameInput, $registerForm } from "../form";
import { $goNextStepButton } from "../buttons";

export function setupEventListeners() {
  $nameInput.addEventListener("input", handleNameInput);
  $emailInput.addEventListener("input", handleEmailInput);
  $goNextStepButton.addEventListener("click", handleGoNextStep);
  $registerForm.addEventListener("submit", handleSubmitRegister);
}
