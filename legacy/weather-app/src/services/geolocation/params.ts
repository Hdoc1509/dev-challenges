import type { ParamOptions } from "@lib/fetcher";

export type SearchCityParams = {
  client: ParamOptions<"city">;
  server: ParamOptions<"q" | "limit" | "key">;
};

export const SEARCH_CITY_PARAMS = {
  CITIES_LIMIT: "5",
};
