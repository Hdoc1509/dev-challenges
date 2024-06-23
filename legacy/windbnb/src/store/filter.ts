import type { RequiredSearchLocation, SearchOptions } from "@/types";
import { create } from "zustand";

export const FILTERS = Object.freeze({
  LOCATION: "LOCATION",
  GUESTS: "GUESTS",
});

type Filter = (typeof FILTERS)[keyof typeof FILTERS] | null;
export type GuestType = "adults" | "children";

type State = {
  filter: Filter;
  location: SearchOptions["location"];
  guests: {
    adults: number;
    children: number;
    total: number;
  };
};

type Action = {
  setFilter: (filter: Filter) => void;
  clearFilter: () => void;
  setLocation: (location: RequiredSearchLocation) => void;
  addGuest: (type: GuestType) => void;
  removeGuest: (type: GuestType) => void;
};

const initialState: State = {
  filter: null,
  location: undefined,
  guests: {
    adults: 0,
    children: 0,
    total: 0,
  },
};

export const useFilterStore = create<State & Action>((set) => ({
  ...initialState,
  setFilter: (filter) => set({ filter }),
  clearFilter: () => set({ filter: null }),
  setLocation: (location) => set({ location }),
  addGuest: (type) => {
    set((state) => ({
      guests: {
        ...state.guests,
        [type]: state.guests[type] + 1,
        total: state.guests.total + 1,
      },
    }));
  },
  removeGuest: (type) => {
    set((state) => {
      const typeCount = state.guests[type];
      const totalCount = state.guests.total;

      return {
        guests: {
          ...state.guests,
          [type]: typeCount > 0 ? typeCount - 1 : 0,
          total: totalCount > 0 ? totalCount - 1 : 0,
        },
      };
    });
  },
}));
