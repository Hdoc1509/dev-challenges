import { ResponseError, fetcher, type PromiseWithError } from "@lib/fetcher";
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

  if (error != null) {
    if (error instanceof ResponseError && error.res.status >= 500)
      return [new Error("Remaining searches service internal error")];

    return [error];
  }

  return [null, data];
}
