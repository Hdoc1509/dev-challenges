import { create } from "zustand";
import type { Job } from "../types";

type State = {
  jobs: Job[];
  isLoading: boolean;
};

type Action = {
  setJobs: (jobs: Job[]) => void;
  setLoading: (isLoading: boolean) => void;
};

const initialState: State = {
  jobs: [],
  isLoading: false,
};

export const useJobsStore = create<State & Action>()((set) => ({
  ...initialState,

  setJobs: (jobs: Job[]) => set({ jobs }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
