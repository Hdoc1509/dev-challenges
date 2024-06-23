import { fetcher, ServiceError } from "@lib/fetcher";
import { QuotesResponseSchema } from "./schema";
import { parseQuotes } from "./parse";
import type { AuthorQuotesService, RandomQuoteService } from "../types";

const API_URL = "https://quote-garden.onrender.com/api/v3/quotes";

const fetcherOptions = {
  schema: QuotesResponseSchema,
  serviceError: new ServiceError("Quotes"),
};

export const getRandomQuote: RandomQuoteService = async () => {
  const [error, data] = await fetcher(`${API_URL}/random`, fetcherOptions);

  if (error) return [error];

  return [null, parseQuotes(data.data)[0]];
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

  return [null, parseQuotes(data.data)];
};
