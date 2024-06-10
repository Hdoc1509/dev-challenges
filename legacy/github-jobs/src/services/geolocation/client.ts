import type { SearchLocationResponse } from "@/schemas/geolocation";
import type { LocationService } from "./types";

export const searchLocation: LocationService = async (options) => {
  const params = new URLSearchParams();

  if ("coords" in options) {
    const { latitude, longitude } = options.coords;
    params.append("q", `${latitude},${longitude}`);
  } else {
    params.append("q", `${options.zipCode}`);
  }

  try {
    const res = await fetch(`/api/geolocation?${params.toString()}`);

    // NOTE: ALL VALIDATIONS are done on the SERVER
    // NOTE: if server has an error it returns `{ error: string }`
    const data = (await res.json()) as
      | { error: string }
      | SearchLocationResponse[number];

    if ("error" in data) return [new Error(data.error)];

    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [new Error("An unknown error occurred while trying to get location")];
};
