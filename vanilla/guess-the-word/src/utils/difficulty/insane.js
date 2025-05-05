import { setWordsByDifficulty } from "@/state/words";
import { DIFFICULTY } from "@/consts/difficulty";

let isApplied = false;

export const InsaneDifficulty = Object.freeze({
  async apply() {
    const { handleLetterFocus } = await import(
      "@/events/handlers/letter-focus"
    );
    const { showTimer } = await import("@/ui/timer");

    isApplied = true;
    showTimer();
    document.addEventListener("focusin", handleLetterFocus);
    await setWordsByDifficulty(DIFFICULTY.INSANE);
  },
  async unapply() {
    if (!isApplied) return;

    const { handleLetterFocus } = await import(
      "@/events/handlers/letter-focus"
    );
    const { hideTimer } = await import("@/ui/timer");

    isApplied = false;
    hideTimer();
    document.removeEventListener("focusin", handleLetterFocus);
  },
  isApplied: () => isApplied,
});
