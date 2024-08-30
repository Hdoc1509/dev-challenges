import { useCallback, useState } from "react";
import { getRemainingSearches } from "@/services/remaining-searches/client";
import type { Status } from "@lib/fetcher";

export function useRemainingSearches() {
  const [remainingSearches, setRemainingSearches] = useState<null | number>(
    null,
  );
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<null | Error>(null);

  const handleGetRemainingSearches = useCallback(async () => {
    setStatus("loading");

    const [error, result] = await getRemainingSearches();

    if (error != null) {
      setError(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    setRemainingSearches(result);
  }, []);

  return {
    remainingSearches,
    remainingSearchesStatus: status,
    remainingSearchesError: error,
    getRemainingSearches: handleGetRemainingSearches,
  };
}
