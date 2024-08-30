import { create } from "zustand";
import type { Status } from "@lib/fetcher";

type State = {
  remainingSearches: number | null;
  error?: Error;
  status: Status;
};

type Action = {
  setRemainingSearches: (remainingSearches: number) => void;
  setStatus: (status: Status) => void;
  setError: (error: Error) => void;
};

export const useRemainingSearchesStore = create<State & Action>()((set) => ({
  remainingSearches: null,
  status: "idle",

  setRemainingSearches: (remainingSearches: number) =>
    set({ remainingSearches }),
  setStatus: (status: Status) => set({ status }),
  setError: (error: Error) => set({ error }),
}));
