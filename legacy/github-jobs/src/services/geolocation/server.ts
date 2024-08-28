import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import {
  LocationResponseSchema,
  LocationErrorSchema,
  type LocationResponse,
} from "./schema";
import { WEATHERAPI } from "@/config";
import type { LocationOptions } from "@/types";

const ResponseSchema = LocationResponseSchema.or(LocationErrorSchema);
const GeolocationError = new ServiceError("Geolocation");
const LOCATIONS_LIMIT = "1";
// from https://www.weatherapi.com/docs/#intro-error-codes
const WEATHERAPI_ERROR_CODE = {
  INTERNAL: 9999,
};

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
      schema: ResponseSchema,
      serviceError: GeolocationError,
      checkStatus: false, // allows to read weatherapi endpoint errors in response
    },
  );

  if (error) return [error];

  if ("error" in data) {
    const { message, code } = data.error;

    if (code === WEATHERAPI_ERROR_CODE.INTERNAL)
      return [new Error("Geolocation service internal error")];

    return [new Error(message)];
  }

  // if no results, response can succeed returning empty array
  // coordinates will always be valid because of Geolocation API
  if (data.length === 0 && "zipCode" in options)
    return [new Error(`No locations found for zip code: ${options.zipCode}`)];

  return [null, data];
};
