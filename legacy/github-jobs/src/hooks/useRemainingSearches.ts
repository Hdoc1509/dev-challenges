import { useCallback } from "react";
import { getRemainingSearches } from "@/services/remaining-searches/client";
import { useRemainingSearchesStore } from "@/store/remaining-searches";
import { STATUS } from "@lib/fetcher";

export function useRemainingSearches() {
  const remainingSearches = useRemainingSearchesStore(
    (s) => s.remainingSearches,
  );
  const error = useRemainingSearchesStore((s) => s.error);
  const status = useRemainingSearchesStore((s) => s.status);
  const setRemainingSearches = useRemainingSearchesStore(
    (s) => s.setRemainingSearches,
  );
  const setStatus = useRemainingSearchesStore((s) => s.setStatus);
  const setError = useRemainingSearchesStore((s) => s.setError);

  const handleGetRemainingSearches = useCallback(async () => {
    setStatus(STATUS.LOADING);

    const [error, result] = await getRemainingSearches();

    if (error != null) {
      setError(error);
      setStatus(STATUS.ERROR);
      return;
    }

    setStatus(STATUS.SUCCESS);
    setRemainingSearches(result);
  }, [setError, setRemainingSearches, setStatus]);

  return {
    remainingSearches,
    error,
    isError: status === STATUS.ERROR,
    isLoading: status === STATUS.LOADING,
    isSuccess: status === STATUS.SUCCESS,
    getRemainingSearches: handleGetRemainingSearches,
  };
}