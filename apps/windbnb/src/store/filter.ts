import { create } from "zustand";

export const Filter = Object.freeze({
  location: "location",
  guests: "guests",
});

type TFilter = keyof typeof Filter;

type FilterStore = {
  filter: TFilter | null;
  setFilter: (filter: TFilter | null) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filter: null,
  setFilter: (filter) => set({ filter }),
}));
