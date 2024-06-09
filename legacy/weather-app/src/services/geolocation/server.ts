import { ServiceError, fetcher } from "@lib/fetcher";
import {
  SearchCityResponseSchema,
  type SearchCityResponse,
} from "@/schemas/geolocation";
import { WEATHERAPI } from "@/config";
import type { PromiseWithError } from "@/types";

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
      schema: SearchCityResponseSchema,
      serviceError: SearchCityError,
    },
  );

  if (error) return [error];

  return [null, data];
};
