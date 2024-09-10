import { fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { RemainingSearchesResponseSchema } from "./schema";
import { RemainingSearchesServiceError } from "./service-error";

const ApiResponseSchema = RemainingSearchesResponseSchema.or(ApiErrorSchema);

export async function getRemainingSearches(): PromiseWithError<number> {
  const [error, data] = await fetcher("/api/remaining-searches", {
    schema: ApiResponseSchema,
    serviceError: RemainingSearchesServiceError,
    checkStatus: false, // allows to read api endpoint errors in response body
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)]; // api endpoint error

  return [null, data.plan_searches_left];
}
