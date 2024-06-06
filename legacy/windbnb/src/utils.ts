import { validateStays } from "./schemas/results-schema";
import type { RequiredSearchLocation, Stay } from "./types";

export const parseStays = (results: unknown): Stay[] => {
  const parsedResults = validateStays(results);

  if (!parsedResults.success) {
    console.error(parsedResults.error);
    // NOTE: should return an empty array(?)
    return [];
  }

  return parsedResults.data.map(({ photo, superHost, ...rest }) => ({
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
