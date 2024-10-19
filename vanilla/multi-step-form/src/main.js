import "./styles/main.css";
import "@fontsource-variable/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

const $registerForm = document.getElementById("register-form");
const $goNextStepButton = document.getElementById("go-nex-step");
const $submitRegisterButton = document.getElementById("submit-register");
const $stepsContainer = document.querySelector(".steps-container");
const $currentStepsLabel = document.getElementById("current-step");
const totalSteps = $stepsContainer.querySelectorAll(".step").length;

$goNextStepButton.addEventListener("click", () => {
  const $currentStep = document.querySelector(".step--current");
  const currentStepCounter = Number($currentStep.dataset.step);

  if (currentStepCounter < totalSteps) {
    const $currentStepperItem = document.querySelector(
      `.stepper__step[data-step="${currentStepCounter}"]`,
    );

    $stepsContainer.style.setProperty(
      "--_step-counter",
      currentStepCounter + 1,
    );
    $currentStep.classList.remove("step--current");
    $currentStep.nextElementSibling.classList.add("step--current");
    $currentStepperItem.removeAttribute("data-current");
    $currentStepperItem.setAttribute("data-completed", "");
    $currentStepperItem.nextElementSibling.setAttribute("data-current", "");
    $currentStepsLabel.innerText = currentStepCounter + 1;
  }

  if (currentStepCounter === totalSteps - 1) {
    $goNextStepButton.classList.add("hidden");
    $submitRegisterButton.classList.remove("hidden");
  }
});

$registerForm.addEventListener("submit", () => {
  console.log("submitting response");
});
