import { useCallback, useState } from "react";
import { searchStays } from "@/services/stays";
import type { SearchOptions, Stay } from "@/types";
import type { Status } from "@lib/fetcher";

export const useStays = () => {
  const [stays, setStays] = useState<Stay[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<Error | null>(null);

  const getStays = useCallback(
    async ({ location, guests }: SearchOptions = {}) => {
      setStatus("loading");

      const [staysError, newStays] = await searchStays({ location, guests });

      if (staysError) {
        setError(staysError);
        setStatus("error");
        return;
      }

      setStays(newStays);
      setStatus("success");
    },
    [],
  );

  const resetStatus = useCallback(() => setStatus("idle"), []);

  return {
    stays,
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
    resetStatus,
    error,
    getStays,
  };
};
