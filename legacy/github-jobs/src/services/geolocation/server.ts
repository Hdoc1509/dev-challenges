import { z } from "zod";
import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import {
  SearchLocationResponseSchema,
  type LocationResponse,
} from "@/schemas/geolocation";
import { WEATHERAPI } from "@/config";
import type { LocationOptions } from "@/types";

// based on http://www.weatherapi.com/docs/#intro-error-codes
const ErrorSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});
const ApiResponseSchema = SearchLocationResponseSchema.or(ErrorSchema);
const GeolocationError = new ServiceError("Geolocation");
const LOCATIONS_LIMIT = "1";

export const searchLocation = async (
  options: LocationOptions,
): PromiseWithError<LocationResponse> => {
  const params = new URLSearchParams({
    limit: LOCATIONS_LIMIT,
    key: WEATHERAPI.KEY,
  });

  if ("coords" in options) {
    const { latitude, longitude } = options.coords;
    params.append("q", `${latitude},${longitude}`);
  } else {
    params.append("q", `${options.zipCode}`);
  }

  const [error, data] = await fetcher(
    `${WEATHERAPI.URL}/search.json?${params.toString()}`,
    {
      schema: ApiResponseSchema,
      serviceError: GeolocationError,
      checkStatus: false, // allows to read weatherapi endpoint errors in response
    },
  );

  if (error) return [error];

  if ("error" in data) return [new Error(data.error.message)];

  // if no results, response can succeed returning empty array
  // coordinates will always be valid because of Geolocation API
  if (data.length === 0 && "zipCode" in options)
    return [new Error(`No locations found for zip code: ${options.zipCode}`)];

  return [null, data[0]];
};
