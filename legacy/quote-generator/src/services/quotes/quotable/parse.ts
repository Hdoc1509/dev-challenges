import type { Quote } from "@/types";
import type { QuoteResponse } from "./schema";

export const parseQuotes = (data: QuoteResponse[]): Quote[] => {
  return data.map(({ _id, content, author, tags }) => ({
    id: _id,
    text: content,
    author,
    genre: tags[0],
  }));
};
