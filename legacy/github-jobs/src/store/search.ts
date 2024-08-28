import { create } from "zustand";
import type { Search } from "@/types";

export type StoreSearch = Omit<Search, "pageAsIndex"> & { pageAsIndex: number };

type State = {
  search: StoreSearch;
  lastSearch: StoreSearch;
  pages: number;
  userLocation: string;
};

type Action = {
  setSearch: (newSearch: Partial<Search>) => void;
  setLastSearch: (newSearch: Partial<Search>) => void;
  setPages: (pages: number) => void;
  setUserLocation: (location: string) => void;
};

const initialState: State = {
  search: {
    query: "",
    location: "",
    fullTime: false,
    pageAsIndex: 0,
  },
  lastSearch: {
    query: "",
    location: "",
    fullTime: false,
    pageAsIndex: 0,
  },
  pages: 0,
  userLocation: "",
};

export const useSearchStore = create<State & Action>()((set) => ({
  ...initialState,

  setSearch: (newSearch: Partial<Search>) =>
    set((state) => ({
      search: { ...state.search, ...newSearch },
    })),
  setLastSearch: (newSearch: Partial<Search>) =>
    set((state) => ({
      lastSearch: { ...state.lastSearch, ...newSearch },
    })),
  setPages: (pages: number) => set({ pages }),
  setUserLocation: (location: string) => set({ userLocation: location }),
}));
