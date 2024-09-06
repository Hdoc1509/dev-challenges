import type { Quote } from "@/types";
import type { QuoteResponse } from "./schema";

export function parseQuotes(quotes: QuoteResponse[]): Quote[] {
  return quotes.map(({ id, body, author, tags }) => ({
    id: id.toString(),
    text: body,
    author,
    genre: tags.slice(0, 3).join(", "),
  }));
}
