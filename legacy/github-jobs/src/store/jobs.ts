import { create } from "zustand";
import { getJobs } from "@/services/jobs/client";
import { getMockedJobs } from "@/services/jobs/mock";
import { getLocationOption } from "@/utils/geolocation";
import { isJobsEmptyResultsError } from "@/services/jobs/service-error";
import { STATUS } from "@lib/fetcher";
import { isDev } from "@/config";
import type { StoreFetchingState, State, Action } from "./jobs.types";

const getJobsService = isDev ? getMockedJobs : getJobs;

export const useJobsStore = create<State & Action>()((set, get) => ({
  cachedJobs: [],
  status: STATUS.IDLE,

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

export const useJobsFetchingSelector = () =>
  useJobsStore(
    (s) =>
      ({
        status: s.status,
        error: s.error,
        jobs: s.jobs,
      }) as StoreFetchingState,
  );
