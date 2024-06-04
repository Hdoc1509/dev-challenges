import { CountryResponseSchema } from "@/schemas/country";
import { parseCountries } from "@/utils/countries";
import type { Country } from "@/types";

const API_URL = "https://restcountries.com/v3.1";

export const getCountries = async (): Promise<Country[]> => {
  const controller = new AbortController();
  const params = new URLSearchParams({
    fields: "name,flags,capital,region",
  });

  setTimeout(() => controller.abort(), 5000);

  const res = await fetch(`${API_URL}/all?${params.toString()}`, {
    signal: controller.signal,
  });

  if (!res.ok) throw new Error("Failed to get countries data");

  const countries = CountryResponseSchema.parse(await res.json());

  return parseCountries(countries);
};
