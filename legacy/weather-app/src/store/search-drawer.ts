import { create } from "zustand";

type State = {
  isOpen: boolean;
};

type Action = {
  setIsOpen: (isOpen: boolean) => void;
};

export const useSearchDrawerStore = create<State & Action>()((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
