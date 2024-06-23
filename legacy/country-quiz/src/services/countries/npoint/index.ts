import { ServiceError, fetcher, type PromiseWithError } from "@lib/fetcher";
import { CountryResponseSchema } from "./schema";
import type { Country } from "@/types";

const API_URL = "https://api.npoint.io";
const BIN_ID = "071b01607bee8b976c4e";

const CountriesError = new ServiceError("Countries");

export const getCountriesFromBin = async (): PromiseWithError<Country[]> => {
  const [error, data] = await fetcher(`${API_URL}/${BIN_ID}`, {
    schema: CountryResponseSchema,
    serviceError: CountriesError,
  });

  if (error) return [error];

  return [null, data];
};
