import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { RemainingSearchesResponseSchema } from "./schema";

const ApiResponseSchema = RemainingSearchesResponseSchema.or(ApiErrorSchema);
const RemainingSearchesError = new ServiceError("RemainingSearches");

export async function getRemainingSearches(): PromiseWithError<number> {
  const [error, data] = await fetcher("/api/remaining-searches", {
    schema: ApiResponseSchema,
    serviceError: RemainingSearchesError,
    checkStatus: false, // allows to read api endpoint errors in response body
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)]; // api endpoint error

  return [null, data.plan_searches_left];
}
