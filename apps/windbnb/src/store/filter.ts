import type { ValueOf } from "type-fest";
import type { RequiredSearchLocation, SearchOptions } from "../types";
import { create } from "zustand";

export const FILTER = Object.freeze({
  LOCATION: "LOCATION",
  GUESTS: "GUESTS",
});

type TFilter = ValueOf<typeof FILTER>;
export type GuestType = "adults" | "children";

type State = {
  filter: TFilter | null;
  location: SearchOptions["location"];
  guests: {
    adults: number;
    children: number;
    total: number;
  };
};

type Action = {
  setFilter: (filter: TFilter | null) => void;
  clearFilter: () => void;
  setLocation: (location: RequiredSearchLocation) => void;
  addGuest: (type: GuestType) => void;
  removeGuest: (type: GuestType) => void;
};

export const useFilterStore = create<State & Action>((set) => ({
  filter: null,
  setFilter: (filter) => set({ filter }),
  clearFilter: () => set({ filter: null }),
  location: undefined,
  setLocation: (location) => set({ location }),
  guests: {
    adults: 0,
    children: 0,
    total: 0,
  },
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
