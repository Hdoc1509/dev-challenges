import { QuoteResponseSchema } from "../schemas/quotes";
import type { Quote } from "../types";

const API_URL = "https://quote-garden.onrender.com/api/v3/quotes";

// TODO: use error handling method from github-jobs
export const getRandomQuote = async (): Promise<Quote> => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000);

  const res = await fetch(`${API_URL}/random`, { signal: controller.signal });
  if (!res.ok) throw new Error("Failed to get a random quote");
  const { data } = QuoteResponseSchema.parse(await res.json());

  return data[0];
};

export const getAuthorQuotes = async (
  author: string,
  limit = 3,
): Promise<Quote[]> => {
  const params = new URLSearchParams({ author, limit: `${limit}` });
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000);

  const res = await fetch(`${API_URL}?${params.toString()}`, {
    signal: controller.signal,
  });
  if (!res.ok) throw new Error("Failed to get author's quotes");
  const { data } = QuoteResponseSchema.parse(await res.json());

  return data;
};
