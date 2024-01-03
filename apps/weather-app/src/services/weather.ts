import { WEATHER_API } from "../config";
import { WeatherResponseSchema, type Weather } from "../schemas/weather";
import type { LocationPosition } from "../schemas/location";

type Options =
  | {
      coords: LocationPosition;
    }
  | {
      city: string;
    };

export const getWeather = async (options: Options): Promise<Weather> => {
  let query = "";

  if ("coords" in options && options.coords != null)
    query = `${options.coords.latitude},${options.coords.longitude}`;
  if ("city" in options && options.city != null) query = `${options.city}`;

  const params = new URLSearchParams({ q: query, key: WEATHER_API.KEY });

  const res = await fetch(
    `${WEATHER_API.URL}/current.json?${params.toString()}`,
  );
  const data = WeatherResponseSchema.parse(await res.json());

  return data;
};
