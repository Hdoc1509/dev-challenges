import { create } from "zustand";
import { searchCity } from "@/services/geolocation/client";
import { STATUS, type Status } from "@lib/fetcher";
import type { City } from "@/types";

type State = {
  search: string;
  lastSearch: string;
  status: Status;
  error: Error | null;
  results: City[];
};

type Action = {
  setSearch: (search: string) => void;
  setLastSearch: (lastSearch: string) => void;
  setStatus: (status: Status) => void;
  setError: (error: Error) => void;
  setResults: (results: City[]) => void;
  searchLocation: (search: string) => Promise<void>;
  removeResultById: (resultId: number) => void;
};

export const useSearchStore = create<State & Action>()((set) => ({
  search: "",
  lastSearch: "",
  status: STATUS.IDLE,
  error: null,
  results: [],
  setSearch: (search) => set({ search }),
  setLastSearch: (lastSearch) => set({ lastSearch }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  setResults: (results) => set({ results }),

  searchLocation: async (search) => {
    set({ status: STATUS.LOADING });

    const [error, results] = await searchCity(search);

    if (error != null) return set({ status: STATUS.ERROR, error });

    set({ status: STATUS.SUCCESS, results });
  },

  removeResultById: (id) =>
    set(({ results }) => ({ results: results.filter((r) => r.id !== id) })),
}));
