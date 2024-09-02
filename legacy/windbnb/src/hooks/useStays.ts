import { useCallback } from "react";
import { useStaysStore } from "@/store/stays";
import { searchStays } from "@/services/stays";
import { STATUS } from "@lib/fetcher";
import type { SearchOptions } from "@/types";

export const useStays = () => {
  const stays = useStaysStore((state) => state.stays);
  const status = useStaysStore((state) => state.status);
  const error = useStaysStore((state) => state.error);
  const setStays = useStaysStore((state) => state.setStays);
  const setStatus = useStaysStore((state) => state.setStatus);
  const setError = useStaysStore((state) => state.setError);
  const resetStatus = useStaysStore((state) => state.resetStatus);

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
    [setError, setStatus, setStays],
  );

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
