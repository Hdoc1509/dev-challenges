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
  JobsServiceSuccess & { usedLocation: string }
>;
type JobSearch = SetOptional<Search, "location">;

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

      const { pageAsIndex } = search;

      const [locationError, location] = await getLocationOption(
        search.location,
      );

      if (locationError) {
        setError(locationError);
        setStatus("error");
        return [locationError];
      }

      if (pageAsIndex != null) {
        const pageCache = cachedJobs[pageAsIndex];

        if (pageCache != null && pageCache.length > 0) {
          setJobs(pageCache);
          return [null, { jobs: pageCache, usedLocation: location }];
        } else if (pageCache != null && pageCache.length === 0) {
          setJobs([]);
          return [null, { jobs: [], usedLocation: location }];
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

      cacheJobs(jobsResult);
      setJobs(jobsResult);
      setStatus("success");

      return [null, { ...jobsSearchResult, usedLocation: location }];
    },
    [cachedJobs, cacheJobs, setError, setJobs, setStatus],
  );

  return {
    jobs,
    cachedJobs,
    jobsError: error,
    jobsStatus: status,
    clearCachedJobs,
    searchJobs,
  };
}
