import { useCallback } from "react";
import { useJobsStore } from "@/store/jobs";
import { getJobs, type JobsServiceSuccess } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { getLocationOption } from "@/utils/geolocation";
import { JobsEmptyResultsError } from "@/errors";
import { isDev } from "@/config";
import type { Search, SetOptional } from "@/types";
import type { PromiseWithError } from "@lib/fetcher";

type SearchResult = PromiseWithError<
  JobsServiceSuccess & { usedLocation: string; isCached?: boolean }
>;
type JobSearch = SetOptional<Search, "location"> & { clearCache?: boolean };

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
      setStatus("loading");

      const { pageAsIndex, clearCache } = search;

      const [locationError, location] = await getLocationOption(
        search.location,
      );

      if (locationError) {
        setError(locationError);
        setStatus("error");
        return [locationError];
      }

      if (pageAsIndex != null && !clearCache) {
        const pageCache = cachedJobs[pageAsIndex];

        if (pageCache != null) {
          const isEmpty = pageCache.length === 0;
          const jobsToUse = isEmpty ? [] : pageCache;

          setJobs(jobsToUse);
          setStatus("success");
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
        setStatus("error");
        return [jobsError];
      }

      const { jobs: jobsResult } = jobsSearchResult;

      if (clearCache) clearCachedJobs();
      cacheJobs(jobsResult);
      setJobs(jobsResult);
      setStatus("success");

      return [null, { ...jobsSearchResult, usedLocation: location }];
    },
    [cachedJobs, cacheJobs, clearCachedJobs, setError, setJobs, setStatus],
  );

  return {
    jobs,
    cachedJobs,
    jobsError: error,
    jobsStatus: status,
    searchJobs,
  };
}
