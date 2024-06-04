import type { CountryResponse } from "../schemas/country";
import type { Country } from "../types";

export const parseCountries = (countries: CountryResponse): Country[] => {
  return countries.map((country) => ({
    name: country.name.common,
    flagUrl: country.flags.svg,
    capital: country.capital,
    region: country.region,
  }));
};
