import { WEATHER_API } from "../config";
import { WeatherResponseSchema, type Weather } from "../schemas/weather";
import type { LocationPosition } from "../utils/geolocation";

export const getWeather = async (
  coords: LocationPosition,
): Promise<Weather> => {
  // TODO: Use error handling method from github-jobs
  const { latitude, longitude } = coords;

  const params = new URLSearchParams({
    q: `${latitude},${longitude}`,
    // WARNING: You shold not build a production app with this API key.
    //   This is only for learning purposes.
    key: WEATHER_API.KEY,
  });

  const res = await fetch(
    `${WEATHER_API.URL}/current.json?${params.toString()}`,
  );
  const data = WeatherResponseSchema.parse(await res.json());

  return data;
};
