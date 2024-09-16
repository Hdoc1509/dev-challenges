import { fetcher, type PromiseWithError } from "@lib/fetcher";
import { WeatherResponseSchema, type WeatherResponse } from "./schema";
import { WeatherServiceError } from "./service-error";
import { WEATHERAPI } from "@/config";
import type { LocationCoords } from "@lib/geolocation";
import type { WeatherParams } from "./params";

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
      schema: WeatherResponseSchema,
      serviceError: WeatherServiceError,
    },
  );

  if (error) return [error];

  return [null, data];
};
