import { useCallback } from "react";
import { useJobsStore } from "@/store/jobs";
import { getJobs, type JobsServiceSuccess } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { getLocationOption } from "@/utils/geolocation";
import { JobsEmptyResultsError } from "@/errors";
import { STATUS } from "@lib/fetcher";
import { isDev } from "@/config";
import type { Simplify } from "@hrc/type-utils";
import type { Search, SetOptional } from "@/types";
import type { PromiseWithError } from "@lib/fetcher";

type SearchResult = PromiseWithError<
  Simplify<JobsServiceSuccess & { usedLocation: string; isCached?: boolean }>
>;
type JobSearch = Simplify<
  SetOptional<Search, "location"> & { clearCache?: boolean }
>;

const getJobsService = isDev ? getMockedJobs : getJobs;

export function useJobs() {
  const jobs = useJobsStore((s) => s.jobs);
  const cachedJobs = useJobsStore((s) => s.cachedJobs);
  const error = useJobsStore((s) => s.error);
  const status = useJobsStore((s) => s.status);
  const cacheJobs = useJobsStore((s) => s.cacheJobs);
  const clearCachedJobs = useJobsStore((s) => s.clearCachedJobs);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);

  const searchJobs = useCallback(
    async (search: JobSearch): SearchResult => {
      setStatus(STATUS.LOADING);

      const { pageAsIndex, clearCache } = search;

      const [locationError, location] = await getLocationOption(
        search.location,
      );

      if (locationError) {
        setError(locationError);
        setStatus(STATUS.ERROR);
        return [locationError];
      }

      if (pageAsIndex != null && !clearCache) {
        const pageCache = cachedJobs[pageAsIndex];

        if (pageCache != null) {
          const isEmpty = pageCache.length === 0;
          const jobsToUse = isEmpty ? [] : pageCache;

          setJobs(jobsToUse);
          setStatus(STATUS.SUCCESS);
          return [
            null,
            { jobs: jobsToUse, usedLocation: location, isCached: true },
          ];
        }
      }

      const jobSearch = { ...search, location };

      const [jobsError, jobsSearchResult] = await getJobsService(jobSearch);

      if (jobsError) {
        if (jobsError instanceof JobsEmptyResultsError) setJobs([]);
        setError(jobsError);
        setStatus(STATUS.ERROR);
        return [jobsError];
      }

      const { jobs: jobsResult } = jobsSearchResult;

      if (clearCache) clearCachedJobs();
      cacheJobs(jobsResult);
      setJobs(jobsResult);
      setStatus(STATUS.SUCCESS);

      return [null, { ...jobsSearchResult, usedLocation: location }];
    },
    [cachedJobs, cacheJobs, clearCachedJobs, setError, setJobs, setStatus],
  );

  return {
    jobs,
    cachedJobs,
    error,
    isError: status === STATUS.ERROR,
    isLoading: status === STATUS.LOADING,
    isSuccess: status === STATUS.SUCCESS,
    searchJobs,
  };
}
