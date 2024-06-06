import type { StaysResponse } from "./schemas/stays";
import type { RequiredSearchLocation, Stay } from "./types";

export const parseStays = (results: StaysResponse): Stay[] => {
  return results.map(({ photo, superHost, ...rest }) => ({
    imageUrl: photo,
    isSuperHost: superHost,
    ...rest,
  }));
};

export const stringifyLocation = (location: RequiredSearchLocation): string => {
  return `${location.city}, ${location.country}`;
};

export const splitStringLocation = (
  location: string,
): RequiredSearchLocation => {
  const [city, country] = location.split(",");
  return { city, country: country.trim() };
};
