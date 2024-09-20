import { create } from "zustand";
import { searchCity } from "@/services/geolocation/client";
import { STATUS, type Status } from "@lib/fetcher";
import type { City } from "@/types";

type State = {
  status: Status;
  error: Error | null;
  results: City[];
};

type Action = {
  searchLocation: (search: string) => Promise<void>;
  removeResultById: (resultId: number) => void;
};

export const useSearchStore = create<State & Action>()((set) => ({
  status: STATUS.IDLE,
  error: null,
  results: [],

  searchLocation: async (search) => {
    set({ status: STATUS.LOADING });

    const [error, results] = await searchCity(search);

    if (error != null) return set({ status: STATUS.ERROR, error });

    set({ status: STATUS.SUCCESS, results });
  },

  removeResultById: (id) =>
    set(({ results }) => ({ results: results.filter((r) => r.id !== id) })),
}));
