import { WeatherResponseSchema } from "@/schemas/weather";
import type { LocationCoords, PromiseWithError, Weather } from "@/types";
import { parseWeather } from "@/utils/weather";

export const getWeather = async (
  coords: LocationCoords,
): PromiseWithError<Weather> => {
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    latitude: `${latitude}`,
    longitude: `${longitude}`,
  });

  try {
    const res = await fetch(`/api/weather?${params.toString()}`);

    if (!res.ok) return [new Error("Weather service error. Response error.")];

    const parsedData = WeatherResponseSchema.safeParse(await res.json());

    if (!parsedData.success)
      return [new Error("Weather service error. Invalid data")];

    return [null, parseWeather(parsedData.data)];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [
    new Error(
      "Weather service error. Something went wrong. Please try again later.",
    ),
  ];
};
