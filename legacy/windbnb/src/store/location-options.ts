import { create } from "zustand";
import { getLocationOptions } from "@/services/location-options";
import { STATUS, type FetchingState } from "@lib/fetcher";
import type { Location } from "@/types";

type StoreFetchingState = FetchingState<{ options: Location[] }>;
type State = StoreFetchingState;

type Action = {
  getOptions: () => void;
  resetStatus: () => void;
};

const useLocationOptionsStore = create<State & Action>()((set) => ({
  status: STATUS.IDLE,

  getOptions: async () => {
    set({ status: STATUS.LOADING });

    const [error, options] = await getLocationOptions();

    if (error) return set({ error, status: STATUS.ERROR });

    set({ options, status: STATUS.SUCCESS });
  },
  resetStatus: () => set({ status: STATUS.IDLE }),
}));

export const useLocationOptionsFetchingSelector = () =>
  useLocationOptionsStore(
    (s) =>
      ({
        status: s.status,
        error: s.error,
        options: s.options,
      }) as StoreFetchingState,
  );

export const useLocationOptionsActions = () =>
  useLocationOptionsStore((s) => ({
    getOptions: s.getOptions,
    resetStatus: s.resetStatus,
  }));
