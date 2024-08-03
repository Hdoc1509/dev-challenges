import { create } from "zustand";
import type { Job, Search } from "../types";

type Status = "idle" | "error" | "success" | "loading";

type State = {
  jobs: Job[];
  prevPageJobs?: Job[];
  nextPageJobs?: Job[];
  status: Status;
  error?: Error;
  search: Search;
  lastSearch: Search;
  pages: number;
};

type Action = {
  /** Sets the jobs and status to `success` */
  setJobs: (jobs: Job[]) => void;
  setPrevPageJobs: (jobs: Job[]) => void;
  setNextPageJobs: (jobs: Job[]) => void;
  setStatus: (status: Status) => void;
  /** Sets the error and status to `error` */
  setError: (error: Error) => void;
  setSearch: (newSearch: Partial<Search>) => void;
  setLastSearch: (newSearch: Partial<Search>) => void;
  setPages: (pages: number) => void;
};

const initialState: State = {
  jobs: [],
  status: "idle",
  error: undefined,
  search: {
    query: "",
    location: "",
    fullTime: false,
    page: 0,
  },
  lastSearch: {
    query: "",
    location: "",
    fullTime: false,
    page: 0,
  },
  pages: 10,
};

export const useJobsStore = create<State & Action>()((set) => ({
  ...initialState,

  setJobs: (jobs: Job[]) => set({ jobs, status: "success" }),
  setPrevPageJobs: (jobs: Job[]) => set({ prevPageJobs: jobs }),
  setNextPageJobs: (jobs: Job[]) => set({ nextPageJobs: jobs }),
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
