import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { CityResponseSchema } from "./schema";
import { parseCities } from "./parse";
import type { City } from "@/types";

const ApiResponseSchema = CityResponseSchema.or(ApiErrorSchema);
const SearchCityError = new ServiceError("Search city");

export const searchCity = async (city: string): PromiseWithError<City[]> => {
  const [error, data] = await fetcher(`/api/geolocation?city=${city}`, {
    schema: ApiResponseSchema,
    serviceError: SearchCityError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)]; // api endpoint error

  return [null, parseCities(data)];
};
