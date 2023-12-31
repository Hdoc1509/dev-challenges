import { randomSort } from "../utils/helpers";
import { CountryResponseSchema, type Country } from "../schemas/country";

const API_URL = "https://restcountries.com/v3.1";
const LS_KEY = "countries";

export const getCountries = async (limit = 10): Promise<Country[]> => {
  const storedCountries = localStorage.getItem(LS_KEY);

  if (storedCountries) {
    return randomSort(JSON.parse(storedCountries) as Country[]).slice(0, limit);
  }

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

  localStorage.setItem(LS_KEY, JSON.stringify(countries));

  return randomSort(countries).slice(0, limit);
};
