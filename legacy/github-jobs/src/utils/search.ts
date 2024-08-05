import type { Search } from "@/types";

type SameSearchArgs = { current: Search; last: Search };

export const isSameSearch = ({ current, last }: SameSearchArgs): boolean => {
  return (
    current.query === last.query &&
    ((current.location === "" && last.location !== "") ||
      current.location === last.location) &&
    current.fullTime === last.fullTime
  );
};
