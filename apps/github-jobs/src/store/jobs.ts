import { create } from "zustand";
import type { Job, SearchOptions } from "../types";

type State = {
  jobs: Job[];
  isLoading: boolean;
  searchQuery: string;
  searchOptions: SearchOptions;
};

type Action = {
  setJobs: (jobs: Job[]) => void;
  setLoading: (isLoading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSearchOptions: (options: SearchOptions) => void;
};

const initialState: State = {
  jobs: [],
  isLoading: false,
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
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSearchOptions: (options: SearchOptions) => set({ searchOptions: options }),
}));
