import type { RawStayData } from "./types";

export const parseResults = (results: RawStayData[]) => {
  return results.map(
    ({ city, photo, title, rating, superHost, type, beds }) => ({
      city,
      imageUrl: photo,
      title,
      rating,
      isSuperHost: superHost,
      type,
      beds,
    }),
  );
};
