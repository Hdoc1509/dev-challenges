import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import {
  LocationResponseSchema,
  LocationErrorSchema,
  type LocationResponse,
} from "./schema";
import { pickLocationOption } from "@/utils/geolocation";
import { WEATHERAPI } from "@/config";
import type { LocationOptions } from "@/types";
import type { SharedSearchParams } from "./params";

type SearchParams = SharedSearchParams & { limit: string; key: string };

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
  const paramsOptions: SearchParams = {
    q: pickLocationOption(options),
    limit: LOCATIONS_LIMIT,
    key: WEATHERAPI.KEY,
  };

  const params = new URLSearchParams(paramsOptions);

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
