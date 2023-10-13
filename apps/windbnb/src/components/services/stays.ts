import results from "../../mocks/stays.json";
import type { Stay } from "../../types";

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
  const stays = results
    .map((stay) => ({
      ...stay,
      imageUrl: stay.photo,
      isSuperHost: stay.superHost,
    }))
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
