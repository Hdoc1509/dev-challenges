import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { SearchCityResponseSchema } from "@/schemas/geolocation";
import type { City } from "@/types";

const Schema = SearchCityResponseSchema.transform((locations) =>
  locations.map(({ id, name, country, lat, lon }) => ({
    id,
    name,
    country,
    latitude: lat,
    longitude: lon,
  })),
);
const ApiResponseSchema = Schema.or(ApiErrorSchema);
const SearchCityError = new ServiceError("Search city");

export const searchCity = async (city: string): PromiseWithError<City[]> => {
  const [error, data] = await fetcher(`/api/geolocation?city=${city}`, {
    schema: ApiResponseSchema,
    serviceError: SearchCityError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)]; // api endpoint error

  return [null, data];
};
