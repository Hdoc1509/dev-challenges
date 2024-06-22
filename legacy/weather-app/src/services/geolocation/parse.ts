import type { City } from "@/types";
import type { CityResponse } from "./schema";

export const parseCities = (cities: CityResponse): City[] => {
  return cities.map(({ id, name, country, lat, lon }) => ({
    id,
    name,
    country,
    latitude: lat,
    longitude: lon,
  }));
};
