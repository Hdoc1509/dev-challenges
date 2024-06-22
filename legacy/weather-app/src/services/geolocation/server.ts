import { z } from "zod";
import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { SearchCityResponseSchema, type SearchCityResponse } from "./schema";
import { WEATHERAPI } from "@/config";

// based on http://www.weatherapi.com/docs/#intro-error-codes
const ErrorSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});
const ResponseSchema = SearchCityResponseSchema.or(ErrorSchema);
const SearchCityError = new ServiceError("Search city");
const CITIES_LIMIT = "5";

export const searchCity = async (
  search: string,
): PromiseWithError<SearchCityResponse> => {
  const params = new URLSearchParams({
    q: search,
    limit: CITIES_LIMIT,
    key: WEATHERAPI.KEY,
  });

  const [error, data] = await fetcher(
    `${WEATHERAPI.URL}/search.json?${params.toString()}`,
    {
      schema: ResponseSchema,
      serviceError: SearchCityError,
      checkStatus: false, // allows to read weatherapi endpoint errors in response
    },
  );

  if (error) return [error];

  if ("error" in data) return [new Error(data.error.message)]; // api endpoint error

  // if no results, response can succeed returning empty array
  if (data.length === 0)
    return [new Error(`No results found for: "${search}"`)];

  return [null, data];
};
