import { useCallback } from "react";
import { useJobsStore } from "@/store/jobs";
import { getJobs } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { getLocationOption } from "@/utils/geolocation";
import { isDev } from "@/config";
import type { Job, Search, SetOptional } from "@/types";
import type { PromiseWithError } from "@lib/fetcher";

type SearchReturn = PromiseWithError<{
  jobs: Job[];
  nextPageToken?: string;
  usedLocation: string;
}>;
type JobSearch = SetOptional<Search, "location">;

export function useJobs() {
  const jobs = useJobsStore((s) => s.jobs);
  const error = useJobsStore((s) => s.error);
  const status = useJobsStore((s) => s.status);
  const cacheJobs = useJobsStore((s) => s.cacheJobs);
  const setJobs = useJobsStore((s) => s.setJobs);
  const setStatus = useJobsStore((s) => s.setStatus);
  const setError = useJobsStore((s) => s.setError);

  const searchJobs = useCallback(async (search: JobSearch): SearchReturn => {
    setStatus("loading");

    const [locationError, location] = await getLocationOption(search.location);

    if (locationError) {
      setError(locationError);
      setStatus("error");
      return [locationError];
    }

    const jobSearch = { ...search, location };

    const [jobsError, jobsSearchResult] = await (isDev
      ? getMockedJobs(jobSearch)
      : getJobs(jobSearch));

    if (jobsError) {
      setError(jobsError);
      setStatus("error");
      return [jobsError];
    }

    const { jobs: jobsResult } = jobsSearchResult;

    cacheJobs(jobsResult);
    setJobs(jobsResult);
    setStatus("success");

    return [null, { ...jobsSearchResult, usedLocation: location }];
  }, []);

  return {
    jobs,
    jobsError: error,
    jobsStatus: status,
    searchJobs,
    setJobsError: setError,
    setJobsStatus: setStatus,
  };
}
