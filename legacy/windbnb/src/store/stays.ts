import { create } from "zustand";
import { searchStays } from "@/services/stays";
import { STATUS } from "@lib/fetcher";
import type { SearchOptions, Stay } from "@/types";

type FetchingState<T extends Record<string, unknown>> =
  | ({
      status: typeof STATUS.IDLE | typeof STATUS.LOADING;
      error?: Error;
    } & Partial<T>)
  | ({ status: typeof STATUS.SUCCESS; error?: Error } & T)
  | ({ status: typeof STATUS.ERROR; error: Error } & Partial<T>);

type StoreFetchingState = FetchingState<{ stays: Stay[] }>;
type State = StoreFetchingState;

type Action = {
  getStays: (options?: SearchOptions) => void;
};

export const useStaysStore = create<State & Action>((set) => ({
  status: STATUS.IDLE,

  getStays: async (options) => {
    set({ status: STATUS.LOADING });

    const [error, stays] = await searchStays(options);

    if (error) return set({ error, status: STATUS.ERROR });

    set({ stays, status: STATUS.SUCCESS });
  },
}));

// initialize store on module load
useStaysStore.getState().getStays();
