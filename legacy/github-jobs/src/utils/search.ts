import type { Search } from "@/types";

export const isSameSearch = (searchA: Search, searchB: Search) => {
  return (
    searchA.query === searchB.query &&
    searchA.location === searchB.location &&
    searchA.fullTime === searchB.fullTime
  );
};
