import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import {
  CityResponseSchema,
  CityErrorResponseSchema,
  type CityResponse,
} from "./schema";
import { WEATHERAPI } from "@/config";
import type { ParamOptions } from "@/types";

type SearchCityParams = ParamOptions<"q" | "limit" | "key">;

const ResponseSchema = CityResponseSchema.or(CityErrorResponseSchema);
const SearchCityError = new ServiceError("Search city");
const CITIES_LIMIT = "5";

export const searchCity = async (
  search: string,
): PromiseWithError<CityResponse> => {
  const params = new URLSearchParams({
    q: search,
    limit: CITIES_LIMIT,
    key: WEATHERAPI.KEY,
  } satisfies SearchCityParams);

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
