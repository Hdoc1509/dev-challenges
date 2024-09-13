import { useCallback } from "react";
import { useSearchDrawerStore } from "@/store/search-drawer";

export function useSearchDrawer() {
  const isOpen = useSearchDrawerStore((s) => s.isOpen);
  const setIsOpen = useSearchDrawerStore((s) => s.setIsOpen);

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    document.body.classList.add("no-scroll");
  }, [setIsOpen]);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("no-scroll");
  }, [setIsOpen]);

  return { isOpen, openDrawer, closeDrawer };
}
