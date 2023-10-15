import { validateResults } from "./schemas/results-schema";
import type { Stay } from "./types";

export const parseResults = (results: unknown): Stay[] => {
  const parsedResults = validateResults(results);

  if (!parsedResults.success) {
    console.error(parsedResults.error);
    // NOTE: should return an empty array(?)
    return [];
  }

  return parsedResults.data.map(({ photo, superHost, ...rest }) => ({
    imageUrl: photo,
    isSuperHost: superHost,
    ...rest,
  }));
};
