import staysMock from "@/mocks/stays.json";
import { validateStays } from "./schema";
import { parseStays } from "./parse";
import type { PromiseWithError } from "@lib/fetcher";
import type { SearchOptions, Stay } from "@/types";

export const searchStays = async ({
  location,
  guests = -Infinity,
}: SearchOptions = {}): PromiseWithError<Stay[]> => {
  // WARNING:
  // This is just a mock implementation.
  // You should retrieve data from a real API and parse it here.
  // Filtering should be handled by the API.
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const parsed = validateStays(staysMock);

  if (!parsed.success)
    return [new Error("Stays service data error. Invalid data")];

  const stays = parseStays(parsed.data)
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

  return [null, stays];
};
