import { setWordsByDifficulty } from "@/state/words";
import { hideTimer, showTimer } from "@/ui/timer";
import { DIFFICULTY } from "@/consts/difficulty";

let hasBeenApplied = false;

export const InsaneDifficulty = Object.freeze({
  async apply() {
    const { handleLetterFocus } = await import(
      "@/events/handlers/letter-focus"
    );

    hasBeenApplied = true;
    showTimer();
    document.addEventListener("focusin", handleLetterFocus);
    await setWordsByDifficulty(DIFFICULTY.INSANE);
  },
  async unapply() {
    if (!hasBeenApplied) return;

    const { handleLetterFocus } = await import(
      "@/events/handlers/letter-focus"
    );

    hideTimer();
    document.removeEventListener("focusin", handleLetterFocus);
  },
});
