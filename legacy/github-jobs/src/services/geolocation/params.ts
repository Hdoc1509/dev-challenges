export type LocationParams = {
  client: { q: string };
  server: { q: string; limit: string; key: string };
};

export const SEARCH_LOCATION_PARAMS = {
  LOCATIONS_LIMIT: "1",
};
