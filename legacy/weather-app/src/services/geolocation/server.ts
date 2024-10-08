import { fetcher, type PromiseWithError } from "@lib/fetcher";
import {
  CityResponseSchema,
  CityErrorResponseSchema,
  type CityResponse,
} from "./schema";
import { SearchCityServiceError } from "./service-error";
import { WEATHERAPI } from "@/config";
import { SEARCH_CITY_PARAMS, type SearchCityParams } from "./params";

const ResponseSchema = CityResponseSchema.or(CityErrorResponseSchema);

export const searchCity = async (
  search: string,
): PromiseWithError<CityResponse> => {
  const params = new URLSearchParams({
    q: search,
    limit: SEARCH_CITY_PARAMS.CITIES_LIMIT,
    key: WEATHERAPI.KEY,
  } satisfies SearchCityParams["server"]);

  const [error, data] = await fetcher(
    `${WEATHERAPI.URL}/search.json?${params.toString()}`,
    {
      schema: ResponseSchema,
      serviceError: SearchCityServiceError,
      checkStatus: false, // allows to read weatherapi endpoint errors in response
    },
  );

  if (error) return [error];

  if ("error" in data)
    return [
      data.error.code === WEATHERAPI.ERROR_CODES.INTERNAL
        ? SearchCityServiceError.internal()
        : new Error(data.error.message),
    ];

  // if no results, response can succeed returning empty array
  if (data.length === 0)
    return [new Error(`No results found for: "${search}"`)];

  return [null, data];
};
