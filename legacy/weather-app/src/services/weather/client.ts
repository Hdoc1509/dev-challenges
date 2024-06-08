import { parseWeather } from "@/utils/weather";
import { ApiErrorSchema } from "@/schemas/api-error";
import { WeatherResponseSchema } from "@/schemas/weather";
import type { LocationCoords, PromiseWithError, Weather } from "@/types";

const ApiResponseSchema = WeatherResponseSchema.or(ApiErrorSchema);

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

    // NOTE: ALL VALIDATIONS are done on the SERVER
    // // if api endpoint has an error, it returns `{ error: string }`
    const parsed = ApiResponseSchema.safeParse(await res.json());

    if (!parsed.success)
      return [new Error("Weather service error. Invalid data")];

    if ("error" in parsed.data) return [new Error(parsed.data.error)];

    return [null, parseWeather(parsed.data)];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [
    new Error(
      "Weather service error. Something went wrong. Please try again later.",
    ),
  ];
};
