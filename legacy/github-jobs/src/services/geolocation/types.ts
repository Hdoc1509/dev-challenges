import type { PromiseWithError } from "@lib/fetcher";
import type { LocationResponse } from "@/schemas/geolocation";
import type { LocationOptions } from "@/types";

export type LocationService = (
  options: LocationOptions,
) => PromiseWithError<LocationResponse>;
