import type { PromiseWithError } from "@lib/fetcher";
import type { LocationCoords } from "@lib/geolocation";
import type { LocationResponse } from "@/schemas/geolocation";

export type LocationOptions = { zipCode: number } | { coords: LocationCoords };

export type LocationService = (
  options: LocationOptions,
) => PromiseWithError<LocationResponse>;
