import staysMock from "../mocks/stays.json";
import { parseStays } from "../utils";
import type { SearchOptions, Stay } from "../types";

export const searchStays = async ({
  location,
  guests = -Infinity,
}: SearchOptions = {}): Promise<Stay[]> => {
  // WARNING:
  // This is just a mock implementation.
  // You should retrieve data from a real API and parse it here.
  // Filtering should be handled by the API.
  const stays = parseStays(staysMock)
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
