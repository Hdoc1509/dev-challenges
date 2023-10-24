import { quoteResponseSchema, type Quote } from "../schemas/quotes";

const API_URL = "https://quote-garden.onrender.com/api/v3/quotes";

export const getRandomQuote = async (): Promise<Quote> => {
  const res = await fetch(`${API_URL}/random`);
  const { data } = quoteResponseSchema.parse(await res.json());

  return data[0];
};

// TODO: Try to return a tuple based on limit number
//  - Use FixedLengthArray from type-fest
export const getAuthorQuotes = async (
  author: string,
  limit = 3,
): Promise<Quote[]> => {
  const params = new URLSearchParams({ author, limit: `${limit}` });

  const res = await fetch(`${API_URL}?${params.toString()}`);
  const { data } = quoteResponseSchema.parse(await res.json());

  return data;
};
