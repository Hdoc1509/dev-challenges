import type { Country } from "@/types";
import type { CountryResponse } from "./schema";

export const parseCountries = (data: CountryResponse): Country[] => {
  return data.map(({ name, flags, capital, region }) => ({
    name: name.common,
    flagUrl: flags.svg,
    capital,
    region,
  }));
};
