import { WEATHERAPI } from "../config";
import { GeolocationResponseError } from "../errors";
import {
  LocationResponseSchema,
  type LocationResponse,
} from "../schemas/geolocation";
import type { PromiseWithError } from "../types";

type LocationOptions = { location: string } | { zipCode: number };

export const searchLocation = async (
  options: LocationOptions,
): PromiseWithError<LocationResponse[number]> => {
  const params = new URLSearchParams({
    q: "zipCode" in options ? `${options.zipCode}` : options.location,
    limit: "zipCode" in options ? "1" : "5",
    key: WEATHERAPI.KEY,
  });

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
