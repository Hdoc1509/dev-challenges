import { create } from "zustand";
import { searchStays } from "@/services/stays";
import { STATUS, type Status } from "@lib/fetcher";
import type { SearchOptions, Stay } from "@/types";

type State = {
  stays: Stay[];
  status: Status;
  error?: Error;
};

type Action = {
  getStays: (options?: SearchOptions) => void;
};

export const useStaysStore = create<State & Action>((set) => ({
  stays: [],
  status: STATUS.IDLE,

  getStays: async (options: SearchOptions = {}) => {
    set({ status: STATUS.LOADING });

    const [error, stays] = await searchStays(options);

    if (error) return set({ error, status: STATUS.ERROR });

    set({ stays, status: STATUS.SUCCESS });
  },
}));

// initialize store on module load
useStaysStore.getState().getStays();
