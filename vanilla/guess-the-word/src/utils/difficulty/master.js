import { setWordsByDifficulty } from "@/state/words";
import { setMaxResets } from "@/state/resets";
import { RESETS } from "@/consts/resets";
import { DIFFICULTY } from "@/consts/difficulty";
import { CLASSES } from "@/consts/css-classes";

let isApplied = false;

export const MasterDifficulty = Object.freeze({
  async apply() {
    const { $resetsContainer } = await import("@/ui/resets");

    isApplied = true;
    setMaxResets(RESETS.MAX.MASTER);
    // $resetsContainer.setAttribute("data-active", "");
    $resetsContainer.classList.remove(CLASSES.HIDDEN);
    await setWordsByDifficulty(DIFFICULTY.MASTER);
  },
  async unapply() {
    if (!isApplied) return;

    const { $resetsContainer } = await import("@/ui/resets");

    isApplied = false;
    $resetsContainer.classList.add(CLASSES.HIDDEN);
  },
  isApplied: () => isApplied,
});
