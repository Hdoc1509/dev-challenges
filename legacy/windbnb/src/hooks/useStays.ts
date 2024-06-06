import { useCallback, useState } from "react";
import { searchStays } from "../services/stays";
import type { SearchOptions, Stay } from "../types";

export const useStays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStays = useCallback(
    async ({ location, guests }: SearchOptions = {}) => {
      try {
        setIsLoading(true);

        const [staysError, newStays] = await searchStays({ location, guests });

        if (staysError) {
          throw new Error(staysError.message);
        }

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
