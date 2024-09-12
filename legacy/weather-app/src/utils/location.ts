import type { Weather } from "@/types";

export const stringifyLocation = (location: Weather["location"]) =>
  `${location.name}, ${location.country}`;
