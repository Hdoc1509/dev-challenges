import { create } from "zustand";
import { searchStays } from "@/services/stays";
import { STATUS, type FetchingState } from "@lib/fetcher";
import type { SearchOptions, Stay } from "@/types";

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

export const useStaysFetchingSelector = () =>
  useStaysStore(
    (s) =>
      ({
        status: s.status,
        error: s.error,
        stays: s.stays,
      }) as StoreFetchingState,
  );

// initialize store on module load
useStaysStore.getState().getStays();
