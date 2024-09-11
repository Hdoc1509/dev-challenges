import { create } from "zustand";
import { STATUS, type Status } from "@lib/fetcher";
import type { Quote } from "@/types";

type State = {
  quotes: Quote[];
  error?: Error;
  status: Status;
  isAuthorQuotes: boolean;
};

type Action = {
  setQuotes: (quotes: Quote[]) => void;
  setError: (error: Error) => void;
  setStatus: (status: Status) => void;
  setIsAuthorQuotes: (isAuthorQuotes: boolean) => void;
};

export const useQuotesStore = create<State & Action>()((set) => ({
  quotes: [],
  status: STATUS.IDLE,
  isAuthorQuotes: false,

  setQuotes: (quotes) => set({ quotes }),
  setError: (error) => set({ error }),
  setStatus: (status) => set({ status }),
  setIsAuthorQuotes: (isAuthorQuotes) => set({ isAuthorQuotes }),
}));
