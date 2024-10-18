import "./style.css";
import "@fontsource-variable/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";

const $registerForm = document.getElementById("register-form");
const $actionButton = document.getElementById("action-button");

$actionButton.addEventListener("click", () => {
  console.log("action button clicked");
});

$registerForm.addEventListener("submit", () => {
  console.log("submitting response");
});
