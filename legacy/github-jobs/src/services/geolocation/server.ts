import { WEATHERAPI } from "@/config";
import { GeolocationResponseError } from "@/errors";
import { SearchLocationResponseSchema } from "@/schemas/geolocation";
import type { LocationService } from "./types";

const LOCATIONS_LIMIT = "1";

export const searchLocation: LocationService = async (options) => {
  const params = new URLSearchParams({
    limit: LOCATIONS_LIMIT,
    key: WEATHERAPI.KEY,
  });
  const controller = new AbortController();

  if ("coords" in options) {
    const { latitude, longitude } = options.coords;
    params.append("q", `${latitude},${longitude}`);
  } else {
    params.append("q", `${options.zipCode}`);
  }

  setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(
      `${WEATHERAPI.URL}/search.json?${params.toString()}`,
      { signal: controller.signal },
    );

    if (!res.ok)
      return [
        new GeolocationResponseError("Geolocation service response error", res),
      ];

    const parsedData = SearchLocationResponseSchema.safeParse(await res.json());

    if (!parsedData.success)
      return [new Error("Geolocation service data error. Invalid data")];

    return [null, parsedData.data[0]];
  } catch (error) {
    if (error instanceof Error) {
      const { name } = error;

      if (name === "AbortError")
        return [new Error("Geolocation service response timed out ")];

      return [error];
    }
  }

  return [new Error("An unknown error occurred while trying to get location")];
};
