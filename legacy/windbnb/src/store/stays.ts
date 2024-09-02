import { create } from "zustand";
import { STATUS, type Status } from "@lib/fetcher";
import type { Stay } from "@/types";

type State = {
  stays: Stay[];
  status: Status;
  error?: Error;
};

type Action = {
  setStays: (stays: Stay[]) => void;
  setStatus: (status: Status) => void;
  setError: (error: Error) => void;
  resetStatus: () => void;
};

export const useStaysStore = create<State & Action>((set) => ({
  stays: [],
  status: STATUS.IDLE,

  setStays: (stays) => set({ stays }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),
  resetStatus: () => set({ status: STATUS.IDLE }),
}));
