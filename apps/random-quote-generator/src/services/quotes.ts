import { quoteResponseSchema, type Quote } from "../schemas/quotes";

const API_URL = "https://quote-garden.onrender.com/api/v3/quotes";

export const getRandomQuote = async (): Promise<Quote> => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000);

  const res = await fetch(`${API_URL}/random`, { signal: controller.signal });
  const { data } = quoteResponseSchema.parse(await res.json());

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
  const { data } = quoteResponseSchema.parse(await res.json());

  return data;
};
