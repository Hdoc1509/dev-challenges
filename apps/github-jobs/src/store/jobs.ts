import { create } from "zustand";
import type { Job, SearchOptions } from "../types";

type Status = "idle" | "error" | "success" | "loading";

type State = {
  jobs: Job[];
  status: Status;
  error?: Error;
  searchQuery: string;
  searchOptions: SearchOptions;
};

type Action = {
  setJobs: (jobs: Job[]) => void;
  setStatus: (status: Status) => void;
  setError: (error: Error) => void;
  setSearchQuery: (query: string) => void;
  setSearchOptions: (options: SearchOptions) => void;
};

const initialState: State = {
  jobs: [],
  status: "idle",
  error: undefined,
  searchQuery: "",
  searchOptions: {
    fullTime: undefined,
    location: undefined,
    page: 0,
  },
};

export const useJobsStore = create<State & Action>()((set) => ({
  ...initialState,

  setJobs: (jobs: Job[]) => set({ jobs }),
  setStatus: (status: Status) => set({ status }),
  setError: (error: Error) => set({ error }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSearchOptions: (options: SearchOptions) => set({ searchOptions: options }),
}));
