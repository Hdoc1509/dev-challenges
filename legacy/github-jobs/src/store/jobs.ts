import { create } from "zustand";
import type { Job } from "../types";

type Status = "idle" | "error" | "success" | "loading";

type State = {
  jobs: Job[];
  cachedJobs: Job[][];
  status: Status;
  error?: Error;
};

type Action = {
  /** Sets the jobs and status to `success` */
  setJobs: (jobs: Job[]) => void;
  /** Save the jobs results to avoid making unnecessary requests
   * **Used for pagination**
   */
  cacheJobs: (jobs: Job[]) => void;
  clearCachedJobs: () => void;
  setStatus: (status: Status) => void;
  /** Sets the error and status to `error` */
  setError: (error: Error) => void;
};

const initialState: State = {
  jobs: [],
  cachedJobs: [],
  status: "idle",
  error: undefined,
};

export const useJobsStore = create<State & Action>()((set) => ({
  ...initialState,

  setJobs: (jobs: Job[]) => set({ jobs, status: "success" }),
  cacheJobs: (jobs: Job[]) =>
    set(({ cachedJobs }) => ({ cachedJobs: cachedJobs.concat([jobs]) })),
  clearCachedJobs: () => set({ cachedJobs: [] }),
  setStatus: (status: Status) => set({ status }),
  setError: (error: Error) => set({ error, status: "error" }),
}));
