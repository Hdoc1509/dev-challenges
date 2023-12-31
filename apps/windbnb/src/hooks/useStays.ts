import { useCallback, useState } from "react";
import { searchStays } from "../services/stays";
import type { FnSearchOptions, SearchOptions, Stay } from "../types";

type Result = {
  isLoading: boolean;
  stays: Stay[];
  getStays: FnSearchOptions;
};

export const useStays = (): Result => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStays = useCallback(
    async ({ location, guests }: SearchOptions = {}) => {
      try {
        setIsLoading(true);

        const newStays = await searchStays({ location, guests });
        setStays(newStays);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    stays,
    isLoading,
    getStays,
  };
};
