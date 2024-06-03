import { randomSort } from "../utils/helpers";
import { type Country } from "../schemas/country";

const API_URL = "https://api.npoint.io";
const LS_KEY = "countries";
const BIN_ID = "b10c3aec32d6fb9d4e4d";

export const getCountriesFromBin = async (limit = 10): Promise<Country[]> => {
  const stored = localStorage.getItem(LS_KEY);

  if (stored) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return randomSort(JSON.parse(stored) as Country[]).slice(0, limit);
  }

  const params = new URLSearchParams({ fields: "name,flags,capital,region" });

  const res = await fetch(`${API_URL}/${BIN_ID}?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to get countries data");

  const countries = (await res.json()) as Country[];

  localStorage.setItem(LS_KEY, JSON.stringify(countries));

  return randomSort(countries).slice(0, limit);
};
