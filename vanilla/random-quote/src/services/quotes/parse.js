/** @typedef {import("@/types").Quote} Quote */
/** @typedef {import("./schema").QuotesResponse} QuotesResponse */

const LINE_BREAK_REGEX = /\r\n/;

/** @param {Array<string>} tags */
const parseTags = (tags) =>
  tags.map((tag) =>
    tag
      .split("-")
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(" "),
  );

/** @param {QuotesResponse["results"][number]} quote */
const quoteFilter = (quote) => quote.author != null && quote.author !== "";

/** @param {string} text */
const parseText = (text) => text.split(LINE_BREAK_REGEX)[0];

/**
 * @param {QuotesResponse["results"][number]} quote
 * @returns {Quote}
 */
function parseQuote(quote) {
  const { author, tags, pk } = quote;

  return {
    id: pk,
    text: parseText(quote.quote),
    // TODO: improve filter typing and remove this type cast
    author: /** @type {string} */ (author),
    tags: parseTags(tags),
  };
}

/** @param {QuotesResponse["results"]} quotes */
export const parseQuotes = (quotes) =>
  quotes.filter(quoteFilter).map(parseQuote);
