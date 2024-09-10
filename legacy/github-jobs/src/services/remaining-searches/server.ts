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
  const paramsOptions: RemainingSearchesParams["server"] = {
    api_key: SERPAPI.KEY,
  };
  const params = new URLSearchParams(paramsOptions);

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
