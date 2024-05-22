import { WEATHERAPI } from "@/config";
import { WeatherResponseSchema, type WeatherResponse } from "@/schemas/weather";
import type { LocationCoords, PromiseWithError } from "@/types";

const errorPrefix = "Weather service error";

export const getWeather = async (
  coords: LocationCoords,
): PromiseWithError<WeatherResponse> => {
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    q: `${latitude},${longitude}`,
    key: WEATHERAPI.KEY,
  });

  try {
    const res = await fetch(
      `${WEATHERAPI.URL}/current.json?${params.toString()}`,
    );

    if (!res.ok) return [new Error(`${errorPrefix}. Response error.`)];

    const parsedData = WeatherResponseSchema.safeParse(await res.json());

    if (!parsedData.success) return [new Error(`${errorPrefix}. Invalid data`)];

    return [null, parsedData.data];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [
    new Error(`${errorPrefix}. Something went wrong. Please try again later.`),
  ];
};
