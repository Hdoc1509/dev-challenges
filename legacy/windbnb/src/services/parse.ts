import type { Stay } from "@/types";
import type { StaysResponse } from "./schema";

export const parseStays = (results: StaysResponse): Stay[] => {
  return results.map(({ photo, superHost, ...rest }) => ({
    imageUrl: photo,
    isSuperHost: superHost,
    ...rest,
  }));
};
