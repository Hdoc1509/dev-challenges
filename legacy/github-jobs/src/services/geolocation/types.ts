import type { LocationResponse } from "@/schemas/geolocation";
import type { LocationCoords, PromiseWithError } from "@/types";

type LocationOptions = { zipCode: number } | { coords: LocationCoords };

export type LocationService = (
  options: LocationOptions,
) => PromiseWithError<LocationResponse[number]>;
