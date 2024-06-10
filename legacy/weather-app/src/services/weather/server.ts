import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { WeatherResponseSchema, type WeatherResponse } from "@/schemas/weather";
import { WEATHERAPI } from "@/config";
import type { LocationCoords } from "@lib/geolocation";

const WeatherError = new ServiceError("Weather");

export const getWeather = async (
  coords: LocationCoords,
): PromiseWithError<WeatherResponse> => {
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    q: `${latitude},${longitude}`,
    key: WEATHERAPI.KEY,
  });

  const [error, data] = await fetcher(
    `${WEATHERAPI.URL}/current.json?${params.toString()}`,
    {
      schema: WeatherResponseSchema,
      serviceError: WeatherError,
    },
  );

  if (error) return [error];

  return [null, data];
};
