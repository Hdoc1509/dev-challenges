import { fetcher, type PromiseWithError } from "@lib/fetcher";
import {
  LocationResponseSchema,
  LocationErrorSchema,
  type LocationResponse,
} from "./schema";
import { GeolocationServiceError } from "./service-error";
import { pickLocationOption } from "@/utils/location-option";
import { WEATHERAPI } from "@/config";
import { SEARCH_LOCATION_PARAMS, type LocationParams } from "./params";
import type { LocationOptions } from "@/types";

const ResponseSchema = LocationResponseSchema.or(LocationErrorSchema);
// from https://www.weatherapi.com/docs/#intro-error-codes
const WEATHERAPI_ERROR_CODE = {
  INTERNAL: 9999,
};

export const searchLocation = async (
  options: LocationOptions,
): PromiseWithError<LocationResponse> => {
  const params = new URLSearchParams({
    q: pickLocationOption(options),
    limit: SEARCH_LOCATION_PARAMS.LOCATIONS_LIMIT,
    key: WEATHERAPI.KEY,
  } satisfies LocationParams["server"]);

  const [error, data] = await fetcher(
    `${WEATHERAPI.URL}/search.json?${params.toString()}`,
    {
      schema: ResponseSchema,
      serviceError: GeolocationServiceError,
      checkStatus: false, // allows to read weatherapi endpoint errors in response
    },
  );

  if (error) return [error];

  if ("error" in data)
    return [
      data.error.code === WEATHERAPI_ERROR_CODE.INTERNAL
        ? GeolocationServiceError.internal()
        : new Error(data.error.message),
    ];

  // if no results, response can succeed returning empty array
  // coordinates will always be valid because of Geolocation API
  if (data.length === 0 && "zipCode" in options)
    return [new Error(`No locations found for zip code: ${options.zipCode}`)];

  return [null, data];
};
