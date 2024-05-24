import { WEATHERAPI } from "@/config";
import {
  SearchCityResponseSchema,
  type SearchCityResponse,
} from "@/schemas/geolocation";
import type { PromiseWithError } from "@/types";

const errorPrefix = "Search city service error";

export const searchCity = async (
  search: string,
): PromiseWithError<SearchCityResponse> => {
  const params = new URLSearchParams({
    q: search,
    limit: "5",
    key: WEATHERAPI.KEY,
  });

  try {
    const res = await fetch(
      `${WEATHERAPI.URL}/search.json?${params.toString()}`,
    );

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
