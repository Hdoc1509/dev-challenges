import {
  ServiceError,
  ResponseError,
  fetcher,
  type PromiseWithError,
} from "@lib/fetcher";
import {
  RemainingSearchesResponseSchema,
  type RemainingSearchesResponse,
} from "./schema";
import { SERPAPI } from "@/config";

type SearchParams = { api_key: string };
type ServiceResult = PromiseWithError<RemainingSearchesResponse>;

const RemainingSearchesError = new ServiceError("Remaining searches");

export async function getRemainingSearches(): ServiceResult {
  const paramsOptions: SearchParams = { api_key: SERPAPI.KEY };
  const params = new URLSearchParams(paramsOptions);

  const [error, data] = await fetcher(
    `${SERPAPI.URL}/account.json?${params.toString()}`,
    {
      schema: RemainingSearchesResponseSchema,
      serviceError: RemainingSearchesError,
    },
  );

  if (error != null) {
    if (error instanceof ResponseError && error.res.status >= 500)
      return [new Error("Remaining searches service internal error")];

    return [error];
  }

  return [null, data];
}
