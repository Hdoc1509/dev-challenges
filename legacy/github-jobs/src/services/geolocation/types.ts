import type { LocationCoords } from "@lib/geolocation";
import type { SearchLocationResponse } from "@/schemas/geolocation";
import type { PromiseWithError } from "@/types";

export type LocationOptions = { zipCode: number } | { coords: LocationCoords };

export type LocationService = (
  options: LocationOptions,
) => PromiseWithError<SearchLocationResponse[number]>;
