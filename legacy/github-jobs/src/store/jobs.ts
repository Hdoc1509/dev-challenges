import { create } from "zustand";
import type { Job, Search } from "../types";

type Status = "idle" | "error" | "success" | "loading";

type State = {
  jobs: Job[];
  status: Status;
  error?: Error;
  search: Search;
  pages: number;
};

type Action = {
  setJobs: (jobs: Job[]) => void;
  setStatus: (status: Status) => void;
  setError: (error: Error) => void;
  setSearch: (newSearch: Partial<Search>) => void;
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
  pages: 10,
};

export const useJobsStore = create<State & Action>()((set) => ({
  ...initialState,

  setJobs: (jobs: Job[]) => set({ jobs }),
  setStatus: (status: Status) => set({ status }),
  setError: (error: Error) => set({ error }),
  setSearch: (newSearch: Partial<Search>) =>
    set((state) => ({
      search: { ...state.search, ...newSearch },
    })),
  setPages: (pages: number) => set({ pages }),
}));
