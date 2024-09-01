import { useCallback, useState } from "react";
import { searchStays } from "@/services/stays";
import { STATUS, type Status } from "@lib/fetcher";
import type { SearchOptions, Stay } from "@/types";

export const useStays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<Error | null>(null);

  const getStays = useCallback(
    async ({ location, guests }: SearchOptions = {}) => {
      setStatus(STATUS.LOADING);

      const [staysError, newStays] = await searchStays({ location, guests });

      if (staysError) {
        setError(staysError);
        setStatus(STATUS.ERROR);
        return;
      }

      setStays(newStays);
      setStatus(STATUS.SUCCESS);
    },
    [],
  );

  const resetStatus = useCallback(() => setStatus("idle"), []);

  return {
    stays,
    isLoading: status === STATUS.LOADING,
    isError: status === STATUS.ERROR,
    isSuccess: status === STATUS.SUCCESS,
    resetStatus,
    error,
    getStays,
  };
};
