import { fetcher, type PromiseWithError } from "@lib/fetcher";
import {
  WeatherResponseSchema,
  WeatherErrorResponseSchema,
  type WeatherResponse,
} from "./schema";
import { WeatherServiceError } from "./service-error";
import { WEATHERAPI } from "@/config";
import type { LocationCoords } from "@lib/geolocation";
import type { WeatherParams } from "./params";

const ResponseSchema = WeatherResponseSchema.or(WeatherErrorResponseSchema);

export const getWeather = async (
  coords: LocationCoords,
): PromiseWithError<WeatherResponse> => {
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    q: `${latitude},${longitude}`,
    key: WEATHERAPI.KEY,
  } satisfies WeatherParams["server"]);

  const [error, data] = await fetcher(
    `${WEATHERAPI.URL}/current.json?${params.toString()}`,
    {
      schema: ResponseSchema,
      serviceError: WeatherServiceError,
      checkStatus: false, // allows to read weatherapi endpoint errors in response
    },
  );

  if (error) return [error];

  if ("error" in data)
    return [
      data.error.code === WEATHERAPI.ERROR_CODES.INTERNAL
        ? WeatherServiceError.internal()
        : new Error(data.error.message),
    ];

  return [null, data];
};
