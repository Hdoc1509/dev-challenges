import type { City } from "@/types";
import type { SearchCityResponse } from "./schema";

export const parseCities = (cities: SearchCityResponse): City[] => {
  return cities.map(({ id, name, country, lat, lon }) => ({
    id,
    name,
    country,
    latitude: lat,
    longitude: lon,
  }));
};
