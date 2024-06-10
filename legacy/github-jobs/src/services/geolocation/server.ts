import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { WEATHERAPI } from "@/config";
import {
  SearchLocationResponseSchema,
  type LocationResponse,
} from "@/schemas/geolocation";
import type { LocationOptions } from "@/types";

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
      schema: SearchLocationResponseSchema,
      serviceError: GeolocationError,
    },
  );

  if (error) return [error];

  return [null, data[0]];
};
