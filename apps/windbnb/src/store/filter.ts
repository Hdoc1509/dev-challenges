import type { ValueOf } from "type-fest";
import { create } from "zustand";

export const FILTER = Object.freeze({
  LOCATION: "LOCATION",
  GUESTS: "GUESTS",
});

type TFilter = ValueOf<typeof FILTER>;
export type GuestType = "adults" | "children";

type FilterStore = {
  filter: TFilter | null;
  setFilter: (filter: TFilter | null) => void;
  location: string | null;
  setLocation: (location?: string | null) => void;
  guests: {
    adults: number;
    children: number;
    total: number;
  };
  addGuest: (type: GuestType) => void;
  removeGuest: (type: GuestType) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filter: null,
  setFilter: (filter) => set({ filter }),
  location: null,
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
