import { z } from "zod";
import { ServiceError, fetcher } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import type { City, PromiseWithError } from "@/types";

const Schema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    country: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
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
