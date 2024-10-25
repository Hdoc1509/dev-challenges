import { setupEventListeners } from "./events/listeners";
import "@fontsource-variable/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "./styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});
