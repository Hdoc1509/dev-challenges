import results from "../mocks/stays.json";
import { parseResults } from "../utils";
import type { Stay } from "../types";

type SearchOptions = {
  location?: {
    city: string;
    country: string;
  };
  guests?: number;
};

export const searchStays = async ({
  location,
  guests = -Infinity,
}: SearchOptions = {}): Promise<Stay[]> => {
  // WARNING:
  // This is just a mock implementation.
  // You should retrieve data from a real API and parse it here.
  // Filtering should be handled by the API.
  const stays = parseResults(results)
    .filter((stay) => stay.maxGuests >= guests)
    .filter((stay) => {
      if (location) {
        return (
          stay.city.toLowerCase() === location.city.toLowerCase() &&
          stay.country.toLowerCase() === location.country.toLowerCase()
        );
      }
      return true;
    });

  return new Promise((resolve) => resolve(stays));
};
