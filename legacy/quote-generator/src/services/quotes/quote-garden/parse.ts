import type { Quote } from "@/types";
import type { QuoteResponse } from "./schema";

export const parseQuotes = (data: QuoteResponse[]): Quote[] => {
  return data.map(({ _id, quoteText, quoteAuthor, quoteGenre }) => ({
    id: _id,
    text: quoteText,
    author: quoteAuthor,
    genre: quoteGenre,
  }));
};
