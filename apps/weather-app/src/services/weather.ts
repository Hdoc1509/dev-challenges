import { WEATHER_API } from "../config";
import { WeatherResponseSchema, type Weather } from "../schemas/weather";
import type { LocationPosition } from "../utils/geolocation";

export const getWeather = async (
  coords: LocationPosition,
): Promise<Weather> => {
  const { latitude, longitude } = coords;

  const params = new URLSearchParams({
    q: `${latitude},${longitude}`,
    key: WEATHER_API.KEY,
  });

  const res = await fetch(
    `${WEATHER_API.URL}/current.json?${params.toString()}`,
  );
  const data = WeatherResponseSchema.parse(await res.json());

  return data;
};
