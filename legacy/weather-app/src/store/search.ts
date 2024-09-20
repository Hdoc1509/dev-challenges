import { create } from "zustand";
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
}));
