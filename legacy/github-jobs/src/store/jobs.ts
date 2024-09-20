import { create } from "zustand";
import { getJobs, type JobsServiceSuccess } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { getLocationOption } from "@/utils/geolocation";
import { isJobsEmptyResultsError } from "@/services/jobs/service-error";
import { STATUS, type PromiseWithError, type Status } from "@lib/fetcher";
import { isDev } from "@/config";
import type { Simplify } from "@hrc/type-utils";
import type { Job, Search, SetOptional } from "../types";

type SearchResult = PromiseWithError<
  Simplify<JobsServiceSuccess & { usedLocation: string; isCached?: boolean }>
>;
type JobSearch = Simplify<
  SetOptional<Search, "location"> & { clearCache?: boolean }
>;

type State = {
  jobs: Job[];
  cachedJobs: Job[][];
  status: Status;
  error?: Error;
};

type Action = {
  setJobs: (jobs: Job[]) => void;
  /** Save the jobs results to avoid making unnecessary requests
   * **Used for pagination**
   */
  cacheJobs: (jobs: Job[]) => void;
  clearCachedJobs: () => void;
  setStatus: (status: Status) => void;
  setError: (error: Error) => void;

  searchJobs: (search: JobSearch) => SearchResult;
};

const getJobsService = isDev ? getMockedJobs : getJobs;

export const useJobsStore = create<State & Action>()((set, get) => ({
  jobs: [],
  cachedJobs: [],
  status: STATUS.IDLE,

  setJobs: (jobs: Job[]) => set({ jobs }),
  cacheJobs: (jobs: Job[]) =>
    set(({ cachedJobs }) => ({ cachedJobs: cachedJobs.concat([jobs]) })),
  clearCachedJobs: () => set({ cachedJobs: [] }),
  setStatus: (status: Status) => set({ status }),
  setError: (error: Error) => set({ error }),

  searchJobs: async (search) => {
    set({ status: STATUS.LOADING });

    const { pageAsIndex, clearCache } = search;

    const [locationError, location] = await getLocationOption(search.location);

    if (locationError != null) {
      set({ status: STATUS.ERROR, error: locationError });
      return [locationError];
    }

    if (pageAsIndex != null && !clearCache) {
      const cachedJobs = get().cachedJobs;
      const pageCache = cachedJobs[pageAsIndex];

      if (pageCache != null) {
        const jobs = pageCache.length === 0 ? [] : pageCache;

        set({ status: STATUS.SUCCESS, jobs });

        return [null, { jobs: jobs, usedLocation: location, isCached: true }];
      }
    }

    const jobSearch = { ...search, location };

    const [jobsError, jobsSearchResult] = await getJobsService(jobSearch);

    if (jobsError != null) {
      if (isJobsEmptyResultsError(jobsError)) set({ jobs: [] });
      set({ status: STATUS.ERROR, error: jobsError });

      return [jobsError];
    }

    const { jobs } = jobsSearchResult;

    if (clearCache) set({ cachedJobs: [] });
    set(({ cachedJobs }) => ({
      status: STATUS.SUCCESS,
      cachedJobs: cachedJobs.concat([jobs]),
      jobs,
    }));

    return [null, { ...jobsSearchResult, usedLocation: location }];
  },
}));
