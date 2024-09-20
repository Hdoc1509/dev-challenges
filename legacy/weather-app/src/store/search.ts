import { create } from "zustand";
import { searchCity } from "@/services/geolocation/client";
import { STATUS, type FetchingState } from "@lib/fetcher";
import type { City } from "@/types";

type StoreFetchingState = FetchingState<{ results: City[] }>;
type State = StoreFetchingState;

type Action = {
  searchLocation: (search: string) => Promise<void>;
  removeResultById: (resultId: number) => void;
};

export const useSearchStore = create<State & Action>()((set) => ({
  status: STATUS.IDLE,

  searchLocation: async (search) => {
    set({ status: STATUS.LOADING });

    const [error, results] = await searchCity(search);

    if (error != null) return set({ status: STATUS.ERROR, error });

    set({ status: STATUS.SUCCESS, results });
  },

  removeResultById: (id) =>
    set(({ results }) => ({ results: results!.filter((r) => r.id !== id) })),
}));

export const useSearchFetchingSelector = () =>
  useSearchStore(
    (s) =>
      ({
        status: s.status,
        error: s.error,
        results: s.results,
      }) as StoreFetchingState,
  );
