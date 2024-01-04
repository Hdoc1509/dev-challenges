import { OPEN_WEATHER_MAP_API } from "../config";
import { LocationResponseSchema, type LocationPosition } from "../schemas/location";

export const getCityPosition = async (
  city: string,
): Promise<LocationPosition> => {
  const params = new URLSearchParams({
    q: city,
    limit: "1",
    appid: OPEN_WEATHER_MAP_API.KEY,
  });

  const res = await fetch(
    `${OPEN_WEATHER_MAP_API.URL}/geo/1.0/direct?${params.toString()}`,
  );
  const data = LocationResponseSchema.parse(await res.json());

  return data[0];
};

export const getCurrentPosition = async (): Promise<LocationPosition> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      resolve({ latitude, longitude });
    });
  });
};
