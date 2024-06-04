import { CountryResponseSchema } from "@/schemas/country";
import { ServiceError } from "@/errors/service";
import { parseCountries } from "@/utils/countries";
import type { Country, PromiseWithError } from "@/types";

const API_URL = "https://restcountries.com/v3.1";

const CountriesError = new ServiceError("Countries");

export const getCountries = async (): PromiseWithError<Country[]> => {
  const controller = new AbortController();
  const params = new URLSearchParams({
    fields: "name,flags,capital,region",
  });

  setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${API_URL}/all?${params.toString()}`, {
      signal: controller.signal,
    });

    if (!res.ok) return [CountriesError.response()];

    const parsedData = CountryResponseSchema.safeParse(await res.json());

    if (!parsedData.success) return [CountriesError.validation()];

    return [null, parseCountries(parsedData.data)];
  } catch (error) {
    if (error instanceof Error) {
      return [error.name === "AbortError" ? CountriesError.timeout() : error];
    }
  }

  return [CountriesError.unknown()];
};
