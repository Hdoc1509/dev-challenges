import { useCallback, useState } from "react";
import { getLocationOptions } from "@/services/location-options";
import { STATUS, type Status } from "@lib/fetcher";
import type { Location } from "@/types";

export function useLocationOptions() {
  const [options, setOptions] = useState<Location[]>([]);
  const [status, setStatus] = useState<Status>(STATUS.IDLE);
  const [error, setError] = useState<Error | null>(null);

  const getOptions = useCallback(async () => {
    setStatus(STATUS.LOADING);

    const [optionsError, newOptions] = await getLocationOptions();

    if (optionsError) {
      setError(optionsError);
      setStatus(STATUS.ERROR);
      return;
    }

    setOptions(newOptions);
    setStatus(STATUS.SUCCESS);
  }, []);

  const resetStatus = useCallback(() => setStatus(STATUS.IDLE), []);

  return {
    options,
    error,
    isLoading: status === STATUS.LOADING,
    isError: status === STATUS.ERROR,
    isSuccess: status === STATUS.SUCCESS,
    resetStatus,
    getOptions,
  };
}
