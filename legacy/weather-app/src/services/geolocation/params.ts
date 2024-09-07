export type SearchCityParams = {
  client: { city: string };
  server: { q: string; limit: string; key: string };
};

export const SEARCH_CITY_PARAMS = {
  CITIES_LIMIT: "5",
};
