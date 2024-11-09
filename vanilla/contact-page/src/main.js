import { getElementById } from "@lib/dom";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/600.css";
import "./styles/main.css";

const $contactForm = getElementById("contact-form", HTMLFormElement);

$contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $contactForm.reset();
});
