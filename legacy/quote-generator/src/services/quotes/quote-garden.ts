import { fetcher, ServiceError, type PromiseWithError } from "@lib/fetcher";
import { QuoteResponseSchema } from "./schema";
import type { Quote } from "@/types";

const API_URL = "https://quote-garden.onrender.com/api/v3/quotes";

const fetcherOptions = {
  schema: QuoteResponseSchema,
  serviceError: new ServiceError("Quotes"),
};

export const getRandomQuote = async (): PromiseWithError<Quote> => {
  const [error, data] = await fetcher(`${API_URL}/random`, fetcherOptions);

  if (error) return [error];

  return [null, data.data[0]];
};

export const getAuthorQuotes = async (
  author: string,
  limit = 3,
): PromiseWithError<Quote[]> => {
  const params = new URLSearchParams({ author, limit: `${limit}` });

  const [error, data] = await fetcher(
    `${API_URL}?${params.toString()}`,
    fetcherOptions,
  );

  if (error) return [error];

  return [null, data.data];
};
