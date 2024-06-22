import { fetcher, ServiceError } from "@lib/fetcher";
import { QuoteResponseSchema } from "./schema";
import type { AuthorQuotesService, RandomQuoteService } from "../types";

const API_URL = "https://quote-garden.onrender.com/api/v3/quotes";

const fetcherOptions = {
  schema: QuoteResponseSchema,
  serviceError: new ServiceError("Quotes"),
};

export const getRandomQuote: RandomQuoteService = async () => {
  const [error, data] = await fetcher(`${API_URL}/random`, fetcherOptions);

  if (error) return [error];

  return [null, data.data[0]];
};

export const getAuthorQuotes: AuthorQuotesService = async (
  author,
  limit = 3,
) => {
  const params = new URLSearchParams({ author, limit: `${limit}` });

  const [error, data] = await fetcher(
    `${API_URL}?${params.toString()}`,
    fetcherOptions,
  );

  if (error) return [error];

  return [null, data.data];
};
