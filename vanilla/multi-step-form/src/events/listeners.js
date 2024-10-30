import {
  handleNameInput,
  handleEmailInput,
} from "./handlers/register-inputs.js";
import { handleTopicCheckboxChange } from "./handlers/topic-checkboxes.js";
import { handleGoNextStep } from "./handlers/steps.js";
import { handleSubmitRegister } from "./handlers/submit-register.js";
import { handleRestart } from "./handlers/restart.js";
import {
  $emailInput,
  $nameInput,
  $registerForm,
  $topicCheckboxes,
  TOPIC_CHECKBOX_NAME,
  TOPIC_CHECKBOX_SELECTOR,
} from "@/form";
import { $restartButton, $submitRegisterButton } from "@/buttons";

export function setupEventListeners() {
  document.addEventListener("change", ({ target }) => {
    if (target instanceof HTMLInputElement) {
      if (target === $nameInput) handleNameInput();

      if (target === $emailInput) handleEmailInput();

      if (target.matches(TOPIC_CHECKBOX_SELECTOR)) handleTopicCheckboxChange();
    }
  });

  document.addEventListener("input", ({ target }) => {
    if (
      target instanceof HTMLInputElement &&
      target.matches(".input--with-error")
    ) {
      if (target === $nameInput) handleNameInput();
      if (target === $emailInput) handleEmailInput();
    }
  });

  $topicCheckboxes.forEach(($checkbox) => {
    $checkbox.addEventListener("blur", (event) => {
      const $activeElement = event.relatedTarget;

      if (!($activeElement instanceof Element)) return;

      if ($activeElement.getAttribute("name") !== TOPIC_CHECKBOX_NAME)
        handleTopicCheckboxChange();
    });
  });

  $registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    $submitRegisterButton.hasAttribute("data-last-step")
      ? handleSubmitRegister()
      : handleGoNextStep();
  });
  $restartButton.addEventListener("click", handleRestart);
}
