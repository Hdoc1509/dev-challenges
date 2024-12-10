import { getRandomQuote, getMockedRandomQuote } from "@/services/quotes";
import { renderError, renderQuote } from "@/ui/quote/render";
import { $copyQuote } from "@/ui/actions";
import { $quote } from "@/ui/quote/elements";

const quoteService = import.meta.env.DEV
  ? getMockedRandomQuote
  : getRandomQuote;

export function handleRandomQuote() {
  $quote.setAttribute("data-status", "LOADING");
  $copyQuote.disabled = true;

  quoteService().then(([error, quote]) => {
    if (error) {
      renderError(error.message);
      $quote.setAttribute("data-status", "ERROR");
      return;
    }

    $quote.setAttribute("data-status", "LOADED");
    $copyQuote.disabled = false;
    renderQuote(quote);
  });
}
