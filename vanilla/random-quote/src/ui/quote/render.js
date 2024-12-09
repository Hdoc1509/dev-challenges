import { $author, $tags, $text, $quote, $error } from "./elements";
/** @typedef {import('@/types').Quote} Quote */

/** @param {HTMLElement} $el */
function clearChildren($el) {
  while ($el.firstChild) $el.removeChild($el.firstChild);
}

/** @param {Quote} quote */
export function renderQuote(quote) {
  const { tags, text, author } = quote;

  clearChildren($tags);
  $author.textContent = author;
  $text.textContent = text;
  tags.slice(0, 2).forEach((tag) => {
    const $tag = document.createElement("li");

    $tag.classList.add("quote__tag");
    $tag.textContent = tag;
    $tags.appendChild($tag);
  });
}

/** @param {string} error */
export function renderError(error) {
  $quote.setAttribute("data-status", "ERROR");
  $error.textContent = error;
}
