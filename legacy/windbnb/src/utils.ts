import type { Location } from "./types";

export const stringifyLocation = (location: Location): string => {
  return `${location.city}, ${location.country}`;
};

export const splitStringLocation = (location: string): Location => {
  const [city, country] = location.split(",");
  return { city, country: country.trim() };
};
