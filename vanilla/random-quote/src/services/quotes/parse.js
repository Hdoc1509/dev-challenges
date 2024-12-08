/** @typedef {import("@/types").Quote} Quote */
/** @typedef {import("./schema").QuotesResponse} QuotesResponse */

/** @param {Array<string>} tags */
const parseTags = (tags) =>
  tags.map((tag) =>
    tag
      .split("-")
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join(" "),
  );

/**
 * @param {QuotesResponse["results"][number]} quote
 * @returns {Quote}
 */
export function parseQuote(quote) {
  const { author, tags, pk } = quote;

  return { id: pk, text: quote.quote, author, tags: parseTags(tags) };
}
