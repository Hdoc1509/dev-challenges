import { getMockedRandomQuote } from "./services/quotes";
import { renderError, renderQuote } from "./ui/quote/render";
import { $quote } from "./ui/quote/elements";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import { setupListeners } from "./events/listeners";
import { $copyQuote } from "./ui/actions";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  setupListeners();

  $copyQuote.disabled = true;
  getMockedRandomQuote().then(([error, quote]) => {
    if (error) {
      renderError(error.message);
      $quote.setAttribute("data-status", "ERROR");
      return;
    }

    $quote.setAttribute("data-status", "LOADED");
    $copyQuote.disabled = false;
    renderQuote(quote);
  });
});
