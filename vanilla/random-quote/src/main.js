import { setupListeners } from "./events/listeners";
import { handleRandomQuote } from "./events/handlers/random-quote";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  setupListeners();
  handleRandomQuote();
});
