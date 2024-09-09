import type { LocationOptions } from "@/types";

export const pickLocationOption = (options: LocationOptions): string =>
  "coords" in options
    ? `${options.coords.latitude},${options.coords.longitude}`
    : `${options.zipCode}`;
