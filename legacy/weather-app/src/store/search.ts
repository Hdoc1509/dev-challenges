import type { City, Status } from "@/types";
import { create } from "zustand";

type State = {
  search: string;
  lastSearch: string;
  status: Status;
  error: Error | null;
  results: City[];
};

type Action = {
  setSearch: (search: State["search"]) => void;
  setLastSearch: (lastSearch: State["lastSearch"]) => void;
  setStatus: (status: State["status"]) => void;
  setError: (error: State["error"]) => void;
  setResults: (results: State["results"]) => void;
};

export const useSearchStore = create<State & Action>()((set) => ({
  search: "",
  lastSearch: "",
  status: "idle",
  error: null,
  results: [],
  setSearch: (search: State["search"]) => set({ search }),
  setLastSearch: (lastSearch: State["lastSearch"]) => set({ lastSearch }),
  setStatus: (status: State["status"]) => set({ status }),
  setError: (error: State["error"]) => set({ error }),
  setResults: (results: State["results"]) => set({ results }),
}));
