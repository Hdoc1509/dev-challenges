import { WEATHERAPI } from "../config";
import { GeolocationResponseError } from "../errors";
import {
  LocationResponseSchema,
  type LocationResponse,
} from "../schemas/geolocation";
import type { LocationCoords, PromiseWithError } from "../types";

type LocationOptions = { zipCode: number } | { coords: LocationCoords };

export const searchLocation = async (
  options: LocationOptions,
): PromiseWithError<LocationResponse[number]> => {
  const params = new URLSearchParams({
    limit: "1",
    key: WEATHERAPI.KEY,
  });

  if ("coords" in options) {
    const { latitude, longitude } = options.coords;
    params.append("q", `${latitude},${longitude}`);
  } else {
    params.append("q", `${options.zipCode}`);
  }

  try {
    const res = await fetch(
      `${WEATHERAPI.URL}/search.json?${params.toString()}`,
    );

    if (!res.ok)
      return [
        new GeolocationResponseError("Geolocation service response error", res),
      ];

    const parsedData = LocationResponseSchema.safeParse(await res.json());

    if (!parsedData.success)
      return [new Error("Geolocation service data error. Invalid data")];

    return [null, parsedData.data[0]];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [new Error("An unknown error occurred while trying to get location")];
};
