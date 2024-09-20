import { create } from "zustand";
import { getRemainingSearches } from "@/services/remaining-searches/client";
import { STATUS, type Status } from "@lib/fetcher";

type State = {
  remainingSearches: number | null;
  error?: Error;
  status: Status;
};

type Action = {
  setRemainingSearches: (remainingSearches: number) => void;
  setStatus: (status: Status) => void;
  setError: (error: Error) => void;

  getRemainingSearches: () => Promise<void>;
};

export const useRemainingSearchesStore = create<State & Action>()((set) => ({
  remainingSearches: null,
  status: STATUS.IDLE,

  setRemainingSearches: (remainingSearches: number) =>
    set({ remainingSearches }),
  setStatus: (status: Status) => set({ status }),
  setError: (error: Error) => set({ error }),

  getRemainingSearches: async () => {
    set({ status: STATUS.LOADING });

    const [error, remainingSearches] = await getRemainingSearches();

    if (error != null) return set({ status: STATUS.ERROR, error });

    set({ status: STATUS.SUCCESS, remainingSearches });
  },
}));
