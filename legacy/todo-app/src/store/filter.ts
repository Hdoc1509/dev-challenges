import { create } from "zustand";
import { FILTERS, type Filter } from "../utils";

type State = {
  filter: Filter;
};

type Action = {
  setFilter: (filter: Filter) => void;
};

export const useFilterStore = create<State & Action>()((set) => ({
  filter: FILTERS.ALL,
  setFilter: (filter: Filter) => set({ filter }),
}));
