import { ApiErrorSchema } from "@/schemas/api-error";
import { LocationResponseSchema } from "@/schemas/geolocation";
import type { LocationService } from "./types";

const ApiResponseSchema = LocationResponseSchema.or(ApiErrorSchema);

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

    const parsed = ApiResponseSchema.safeParse(await res.json());

    if (!parsed.success)
      return [new Error("Geolocation service data error. Invalid data")];

    const { data } = parsed;

    if ("error" in data) return [new Error(data.error)];

    return [null, data];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [new Error("An unknown error occurred while trying to get location")];
};
