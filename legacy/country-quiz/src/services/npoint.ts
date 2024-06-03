import { type Country } from "../schemas/country";

const API_URL = "https://api.npoint.io";
const BIN_ID = "b10c3aec32d6fb9d4e4d";

export const getCountriesFromBin = async (): Promise<Country[]> => {
  const params = new URLSearchParams({ fields: "name,flags,capital,region" });

  const res = await fetch(`${API_URL}/${BIN_ID}?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to get countries data");

  const countries = (await res.json()) as Country[];

  return countries;
};
