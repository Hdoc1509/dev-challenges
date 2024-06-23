import type { RequiredSearchLocation } from "./types";

export const stringifyLocation = (location: RequiredSearchLocation): string => {
  return `${location.city}, ${location.country}`;
};

export const splitStringLocation = (
  location: string,
): RequiredSearchLocation => {
  const [city, country] = location.split(",");
  return { city, country: country.trim() };
};
