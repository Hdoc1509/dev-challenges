import "./styles/main.css";
import "@fontsource-variable/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

const $registerForm = document.getElementById("register-form");
const $goNextStepButton = document.getElementById("go-nex-step");

$goNextStepButton.addEventListener("click", () => {
  console.log("next step");
});

$registerForm.addEventListener("submit", () => {
  console.log("submitting response");
});
