import { fetcher, type PromiseWithError } from "@lib/fetcher";
import { ApiErrorSchema } from "@/schemas/api-error";
import { WeatherResponseSchema } from "./schema";
import { WeatherServiceError } from "./service-error";
import { parseWeather } from "./parse";
import type { LocationCoords } from "@lib/geolocation";
import type { Weather } from "@/types";
import type { WeatherParams } from "./params";

const ApiResponseSchema = WeatherResponseSchema.or(ApiErrorSchema);

export const getWeather = async (
  coords: LocationCoords,
): PromiseWithError<Weather> => {
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    latitude: `${latitude}`,
    longitude: `${longitude}`,
  } satisfies WeatherParams["client"]);

  const [error, data] = await fetcher(`/api/weather?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: WeatherServiceError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)]; // api endpoint error

  return [null, parseWeather(data)];
};
