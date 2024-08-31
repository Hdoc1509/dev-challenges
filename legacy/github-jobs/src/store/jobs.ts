import { create } from "zustand";
import { STATUS, type Status } from "@lib/fetcher";
import type { Job } from "../types";

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
};

export const useJobsStore = create<State & Action>()((set) => ({
  jobs: [],
  cachedJobs: [],
  status: STATUS.IDLE,

  setJobs: (jobs: Job[]) => set({ jobs }),
  cacheJobs: (jobs: Job[]) =>
    set(({ cachedJobs }) => ({ cachedJobs: cachedJobs.concat([jobs]) })),
  clearCachedJobs: () => set({ cachedJobs: [] }),
  setStatus: (status: Status) => set({ status }),
  setError: (error: Error) => set({ error }),
}));
