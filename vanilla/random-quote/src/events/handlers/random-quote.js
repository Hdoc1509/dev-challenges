import { getRandomQuote, getMockedRandomQuote } from "@/services/quotes";
import { resetAlert } from "@lib/alert";
import { renderError, renderQuote } from "@/ui/quote/render";
import { $copyQuote } from "@/ui/actions";
import { $quote } from "@/ui/quote/elements";

const quoteService = import.meta.env.DEV
  ? getMockedRandomQuote
  : getRandomQuote;

export function handleRandomQuote() {
  resetAlert();
  $quote.setAttribute("data-status", "LOADING");
  $copyQuote.disabled = true;

  quoteService().then(([error, quote]) => {
    if (error) return renderError(error.message);

    $copyQuote.disabled = false;
    renderQuote(quote);
  });
}
