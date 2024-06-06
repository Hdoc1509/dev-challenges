import { z } from "zod";
import { ServiceError, fetcher, type PromiseWithError } from "@/lib/fetcher";
import type { Country } from "@/types";

const API_URL = "https://api.npoint.io";
const BIN_ID = "071b01607bee8b976c4e";

const CountriesError = new ServiceError("Countries");

const Schema = z.array(
  z.object({
    name: z.string(),
    region: z.string(),
    capital: z.array(z.string()),
    flagUrl: z.string(),
  }),
);

export const getCountriesFromBin = async (): PromiseWithError<Country[]> => {
  const [error, data] = await fetcher(`${API_URL}/${BIN_ID}`, {
    schema: Schema,
    serviceError: CountriesError,
  });

  if (error) return [error];

  return [null, data];
};
