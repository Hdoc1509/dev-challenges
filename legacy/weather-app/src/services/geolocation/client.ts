import {
  SearchCityResponseSchema,
  type SearchCityResponse,
} from "@/schemas/geolocation";
import type { PromiseWithError } from "@/types";

const errorPrefix = "Search city service error";

export const searchCity = async (
  city: string,
): PromiseWithError<SearchCityResponse> => {
  try {
    const res = await fetch(`/api/geolocation?city=${city}`);

    if (!res.ok) return [new Error(`${errorPrefix}. Response error.`)];

    const parsedData = SearchCityResponseSchema.safeParse(await res.json());

    if (!parsedData.success) return [new Error(`${errorPrefix}. Invalid data`)];

    return [null, parsedData.data];
  } catch (error) {
    if (error instanceof Error) return [error];
  }

  return [
    new Error(`${errorPrefix}. Something went wrong. Please try again later.`),
  ];
};