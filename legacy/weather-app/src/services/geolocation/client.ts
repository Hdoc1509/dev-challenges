import { fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { CityResponseSchema } from "./schema";
import { SearchCityServiceError } from "./service-error";
import { parseCities } from "./parse";
import type { City } from "@/types";
import type { SearchCityParams } from "./params";

const ApiResponseSchema = CityResponseSchema.or(ApiErrorSchema);

export const searchCity = async (city: string): PromiseWithError<City[]> => {
  const params = new URLSearchParams({
    city,
  } satisfies SearchCityParams["client"]);

  const [error, data] = await fetcher(`/api/geolocation?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: SearchCityServiceError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)]; // api endpoint error

  return [null, parseCities(data)];
};
