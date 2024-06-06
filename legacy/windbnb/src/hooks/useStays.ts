import { useCallback, useState } from "react";
import { searchStays } from "../services/stays";
import type { SearchOptions, Stay } from "../types";

export const useStays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getStays = useCallback(
    async ({ location, guests }: SearchOptions = {}) => {
      setIsLoading(true);
      setError(null);

      const [staysError, newStays] = await searchStays({ location, guests });

      if (staysError) {
        setError(staysError);
        setIsLoading(false);
        return;
      }

      setStays(newStays);
      setIsLoading(false);
    },
    [],
  );

  return {
    stays,
    isLoading,
    error,
    getStays,
  };
};
