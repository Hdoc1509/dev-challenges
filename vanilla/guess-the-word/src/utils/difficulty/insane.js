import { setWordsByDifficulty } from "@/state/words";
import { DIFFICULTY } from "@/consts/difficulty";

let isApplied = false;

export const InsaneDifficulty = Object.freeze({
  async apply() {
    const { handleLetterFocus } = await import(
      "@/events/handlers/letter-focus"
    );
    const { showInsaneCountdown } = await import("@/ui/insane-countdown-bar");

    isApplied = true;
    showInsaneCountdown();
    document.addEventListener("focusin", handleLetterFocus);
    await setWordsByDifficulty(DIFFICULTY.INSANE);
  },
  async unapply() {
    if (!isApplied) return;

    const { handleLetterFocus } = await import(
      "@/events/handlers/letter-focus"
    );
    const { hideInsaneCountdown } = await import("@/ui/insane-countdown-bar");

    isApplied = false;
    hideInsaneCountdown();
    document.removeEventListener("focusin", handleLetterFocus);
  },
  isApplied: () => isApplied,
});
