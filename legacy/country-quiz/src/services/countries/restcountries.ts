import { CountryResponseSchema } from "@/schemas/country";
import { ServiceError, fetcher, type PromiseWithError } from "@/lib/fetcher";
import { parseCountries } from "@/utils/countries";
import type { Country } from "@/types";

const API_URL = "https://restcountries.com/v3.1";

const CountriesError = new ServiceError("Countries");

export const getCountries = async (): PromiseWithError<Country[]> => {
  const params = new URLSearchParams({
    fields: "name,flags,capital,region",
  });

  const [error, data] = await fetcher(`${API_URL}/all?${params.toString()}`, {
    schema: CountryResponseSchema,
    serviceError: CountriesError,
  });

  if (error) return [error];

  return [null, parseCountries(data)];
};
