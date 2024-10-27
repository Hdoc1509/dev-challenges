import { getElementBySelector } from "@/utils/dom.js";
import { $restartButton, $submitRegisterButton } from "@/buttons";
import { $registerForm } from "@/form";
import { $stepsContainer } from "@/steps";
import { $summaryTopicsList } from "@/summary";
import { resetAlert } from "@/alert";

export function handleRestart() {
  const $currentStep = getElementBySelector(".step--current", HTMLElement);
  const $firstStep = getElementBySelector(".step", HTMLElement);
  /** @type {HTMLSpanElement[]} */
  const $stepperItems = Array.from(document.querySelectorAll(".stepper__step"));

  $registerForm.reset();

  $stepsContainer.style.setProperty("--_step-counter", "1");
  $currentStep.classList.remove("step--current");
  $firstStep.classList.add("step--current");

  while ($summaryTopicsList.firstChild)
    $summaryTopicsList.removeChild($summaryTopicsList.firstChild);

  $stepperItems.forEach(($item, idx) => {
    if (idx === 0) $item.setAttribute("data-current", "");
    else $item.removeAttribute("data-current");
    $item.removeAttribute("data-completed");
  });

  $submitRegisterButton.classList.remove("hidden");
  $submitRegisterButton.disabled = false;
  $submitRegisterButton.textContent = "Continue";
  $submitRegisterButton.removeAttribute("data-last-step");
  $restartButton.classList.add("hidden");
  $restartButton.disabled = true;

  resetAlert();
}
