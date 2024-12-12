import { ValidationError, STATUS } from "@lib/fetcher";
import { getRandomQuote, getMockedRandomQuote } from "@/services/quotes";
import { resetAlert } from "@lib/alert";
import { renderError, renderQuote } from "@/ui/quote/render";
import { getElementById } from "@lib/dom";
import { handleCopyValidationError } from "./copy-error";
import { $copyQuote } from "@/ui/actions";
import { $quote } from "@/ui/quote/elements";

let copyErrorHandler = () => {};

const quoteService = import.meta.env.DEV
  ? getMockedRandomQuote
  : getRandomQuote;

const $copyError = getElementById("copy-error", HTMLButtonElement);

export function handleRandomQuote() {
  resetAlert();
  $copyError.removeEventListener("click", copyErrorHandler);
  $quote.setAttribute("data-status", STATUS.LOADING);
  $copyQuote.disabled = true;

  quoteService().then(([error, quote]) => {
    if (error) {
      if (error instanceof ValidationError) {
        copyErrorHandler = () => handleCopyValidationError(error);
        $copyError.addEventListener("click", copyErrorHandler);
      }

      return renderError(error.message);
    }

    $copyQuote.disabled = false;
    renderQuote(quote);
  });
}
