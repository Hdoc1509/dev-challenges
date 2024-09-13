import { useCallback } from "react";
import { useSearchStore } from "@/store/search";
import { searchCity } from "@/services/geolocation/client";
import { STATUS } from "@lib/fetcher";

export function useSearchLocation() {
  const status = useSearchStore((s) => s.status);
  const error = useSearchStore((s) => s.error);
  const results = useSearchStore((s) => s.results);
  const setStatus = useSearchStore((s) => s.setStatus);
  const setError = useSearchStore((s) => s.setError);
  const setResults = useSearchStore((s) => s.setResults);

  const searchLocation = useCallback(
    async (search: string) => {
      setStatus(STATUS.LOADING);

      const [citiesError, cities] = await searchCity(search);

      if (citiesError) {
        setError(citiesError);
        setStatus(STATUS.ERROR);
        return;
      }

      setResults(cities);
      setStatus(STATUS.SUCCESS);
    },
    [setError, setResults, setStatus],
  );

  const removeResultById = useCallback(
    (resultId: number) => setResults(results.filter((r) => r.id !== resultId)),
    [results, setResults],
  );

  return {
    isLoading: status === STATUS.LOADING,
    isError: status === STATUS.ERROR,
    isSuccess: status === STATUS.SUCCESS,
    error,
    results,
    searchLocation,
    removeResultById,
  };
}
