import { getElementBySelector } from "@/utils/dom.js";
import { $submitRegisterButton } from "@/buttons";
import { validateNameInput } from "@/validation/register/name.js";
import { validateEmailInput } from "@/validation/register/email.js";
import { validateTopicCheckboxes } from "@/validation/topics.js";
import { $currentStepsLabel, $stepsContainer, totalSteps } from "@/steps";
import { $summaryEmail, $summaryName, $summaryTopicsList } from "@/summary";
import { $emailInput, $nameInput, $topicCheckboxes } from "@/form";

export const handleGoNextStep = () => {
  const $currentStep = getElementBySelector(".step--current", HTMLElement);
  const currentStepCounter = Number($currentStep.dataset.step);

  if (currentStepCounter < totalSteps) {
    // register step
    if ($currentStep.classList.contains("register-step")) {
      const nameValidation = validateNameInput();
      let hasErrors = false;

      if (!nameValidation.success) {
        hasErrors = true;
        nameValidation.showError();
      }

      const emailValidation = validateEmailInput();

      hasErrors = !emailValidation.success;

      if (hasErrors) return;
    }

    // topics step
    if ($currentStep.classList.contains("topics-step")) {
      const validation = validateTopicCheckboxes();

      if (!validation.success) return;
    }

    const $currentStepperItem = getElementBySelector(
      `.stepper__step[data-step="${currentStepCounter}"]`,
      HTMLSpanElement,
    );

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

  // summary step (last step)
  if (currentStepCounter === totalSteps - 1) {
    $summaryName.textContent = $nameInput.value;
    $summaryEmail.textContent = $emailInput.value;

    const selectedTopics = $topicCheckboxes
      .filter(($checkbox) => $checkbox.checked)
      .map(($checkbox) => $checkbox.nextElementSibling?.textContent);

    selectedTopics.forEach((topic) => {
      if (topic == null) return;

      const $topicItem = document.createElement("li");

      $topicItem.textContent = topic;
      $summaryTopicsList.appendChild($topicItem);
    });

    $submitRegisterButton.textContent = "Confirm";
    $submitRegisterButton.setAttribute("data-last-step", "");
  }
};
