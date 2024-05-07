import { create } from "zustand";
import type { Job } from "../types";

type State = {
  jobs: Job[];
};

type Action = {
  setJobs: (jobs: Job[]) => void;
};

const initialState: State = {
  jobs: [],
};

export const useJobsStore = create<State & Action>()((set) => ({
  ...initialState,

  setJobs: (jobs: Job[]) => set({ jobs }),
}));
