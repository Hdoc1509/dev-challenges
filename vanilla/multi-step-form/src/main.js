import "./style.css";

const $registerForm = document.getElementById("register-form");
const $actionButton = document.getElementById("action-button");

$actionButton.addEventListener("click", () => {
  console.log("action button clicked");
});

$registerForm.addEventListener("submit", () => {
  console.log("submitting response");
});
