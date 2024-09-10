import { fetcher, is5xxError, type PromiseWithError } from "@lib/fetcher";
import {
  RemainingSearchesResponseSchema,
  type RemainingSearchesResponse,
} from "./schema";
import { RemainingSearchesServiceError } from "./service-error";
import { SERPAPI } from "@/config";
import type { RemainingSearchesParams } from "./params";

type ServiceResult = PromiseWithError<RemainingSearchesResponse>;

export async function getRemainingSearches(): ServiceResult {
  const params = new URLSearchParams({
    api_key: SERPAPI.KEY,
  } satisfies RemainingSearchesParams["server"]);

  const [error, data] = await fetcher(
    `${SERPAPI.URL}/account.json?${params.toString()}`,
    {
      schema: RemainingSearchesResponseSchema,
      serviceError: RemainingSearchesServiceError,
    },
  );

  if (error != null)
    return [
      is5xxError(error) ? RemainingSearchesServiceError.internal() : error,
    ];

  return [null, data];
}
