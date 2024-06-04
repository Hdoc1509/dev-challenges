import { type Country } from "../types";

const API_URL = "https://api.npoint.io";
const BIN_ID = "071b01607bee8b976c4e";

export const getCountriesFromBin = async (): Promise<Country[]> => {
  const params = new URLSearchParams({ fields: "name,flags,capital,region" });

  const res = await fetch(`${API_URL}/${BIN_ID}?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to get countries data");

  const countries = (await res.json()) as Country[];

  return countries;
};
