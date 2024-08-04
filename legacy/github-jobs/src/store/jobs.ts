import { create } from "zustand";
import type { Job, Search } from "../types";

type Status = "idle" | "error" | "success" | "loading";

export type StoreSearch = Omit<Search, "pageAsIndex"> & { pageAsIndex: number };

type State = {
  jobs: Job[];
  cachedJobs: Job[][];
  status: Status;
  error?: Error;
  search: StoreSearch;
  lastSearch: StoreSearch;
  pages: number;
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
  setSearch: (newSearch: Partial<Search>) => void;
  setLastSearch: (newSearch: Partial<Search>) => void;
  setPages: (pages: number) => void;
};

const initialState: State = {
  jobs: [],
  cachedJobs: [],
  status: "idle",
  error: undefined,
  search: {
    query: "",
    location: "",
    fullTime: false,
    pageAsIndex: 0,
  },
  lastSearch: {
    query: "",
    location: "",
    fullTime: false,
    pageAsIndex: 0,
  },
  pages: 10,
};

export const useJobsStore = create<State & Action>()((set) => ({
  ...initialState,

  setJobs: (jobs: Job[]) => set({ jobs, status: "success" }),
  cacheJobs: (jobs: Job[]) =>
    set(({ cachedJobs }) => ({ cachedJobs: cachedJobs.concat([jobs]) })),
  clearCachedJobs: () => set({ cachedJobs: [] }),
  setStatus: (status: Status) => set({ status }),
  setError: (error: Error) => set({ error, status: "error" }),
  setSearch: (newSearch: Partial<Search>) =>
    set((state) => ({
      search: { ...state.search, ...newSearch },
    })),
  setLastSearch: (newSearch: Partial<Search>) =>
    set((state) => ({
      lastSearch: { ...state.lastSearch, ...newSearch },
    })),
  setPages: (pages: number) => set({ pages }),
}));
