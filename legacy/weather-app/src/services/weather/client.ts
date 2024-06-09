import { ServiceError, fetcher } from "@lib/fetcher";
import { parseWeather } from "@/utils/weather";
import { ApiErrorSchema } from "@/schemas/api-error";
import { WeatherResponseSchema } from "@/schemas/weather";
import type { LocationCoords, PromiseWithError, Weather } from "@/types";

const ApiResponseSchema = WeatherResponseSchema.or(ApiErrorSchema);
const WeatherError = new ServiceError("Weather");

export const getWeather = async (
  coords: LocationCoords,
): PromiseWithError<Weather> => {
  const { latitude, longitude } = coords;
  const params = new URLSearchParams({
    latitude: `${latitude}`,
    longitude: `${longitude}`,
  });

  const [error, data] = await fetcher(`/api/weather?${params.toString()}`, {
    schema: ApiResponseSchema,
    serviceError: WeatherError,
    checkStatus: false, // allows to read api endpoint errors in response
  });

  if (error) return [error];

  if ("error" in data) return [new Error(data.error)]; // api endpoint error

  return [null, parseWeather(data)];
};
