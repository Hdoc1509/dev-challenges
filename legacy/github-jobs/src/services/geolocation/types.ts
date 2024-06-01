import type { LocationResponse } from "@/schemas/geolocation";
import type { LocationCoords, PromiseWithError } from "@/types";

export type LocationOptions = { zipCode: number } | { coords: LocationCoords };

export type LocationService = (
  options: LocationOptions,
) => PromiseWithError<LocationResponse[number]>;
