import { create } from "zustand";

const NO_SCROLL_CLASS = "no-scroll";

type State = {
  isOpen: boolean;
};

type Action = {
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const useSearchDrawerStore = create<State & Action>()((set) => ({
  isOpen: false,

  openDrawer: () => {
    document.body.classList.add(NO_SCROLL_CLASS);
    set({ isOpen: true });
  },
  closeDrawer: () => {
    document.body.classList.remove(NO_SCROLL_CLASS);
    set({ isOpen: false });
  },
}));
