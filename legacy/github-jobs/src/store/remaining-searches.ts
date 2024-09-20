import { create } from "zustand";
import { getRemainingSearches } from "@/services/remaining-searches/client";
import { STATUS, type FetchingState } from "@lib/fetcher";

type StoreFetchingState = FetchingState<{ remainingSearches: number }>;
type State = StoreFetchingState;

type Action = {
  getRemainingSearches: () => Promise<void>;
};

export const useRemainingSearchesStore = create<State & Action>()((set) => ({
  status: STATUS.IDLE,

  getRemainingSearches: async () => {
    set({ status: STATUS.LOADING });

    const [error, remainingSearches] = await getRemainingSearches();

    if (error != null) return set({ status: STATUS.ERROR, error });

    set({ status: STATUS.SUCCESS, remainingSearches });
  },
}));

export const useRemainingSearchesFetchingSelector = () =>
  useRemainingSearchesStore(
    (s) =>
      ({
        status: s.status,
        error: s.error,
        remainingSearches: s.remainingSearches,
      }) as StoreFetchingState,
  );

// initialize store on module load
useRemainingSearchesStore.getState().getRemainingSearches();
