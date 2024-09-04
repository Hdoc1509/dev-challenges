import { ServiceError, fetcher } from "@lib/fetcher";
import { QuotesResponseSchema } from "./schema";
import { parseQuotes } from "./parse";
import { FAVQS_API } from "@/config";
import type { RandomQuoteService } from "./types";

// type SearchParams = { filter: string; type: "author" }

export const getRandomQuote: RandomQuoteService = async () => {
  const [error, data] = await fetcher(`${FAVQS_API.URL}/quotes`, {
    schema: QuotesResponseSchema,
    serviceError: new ServiceError("Quotes"),
  });

  if (error) return [error];

  return [null, parseQuotes(data.quotes)[0]];
};
