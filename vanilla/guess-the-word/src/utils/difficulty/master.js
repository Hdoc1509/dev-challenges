import { setWordsByDifficulty } from "@/state/words";
import { setMaxResets } from "@/state/resets";
import { RESETS } from "@/consts/resets";
import { DIFFICULTY } from "@/consts/difficulty";

let isApplied = false;

export const MasterDifficulty = Object.freeze({
  async apply() {
    const { $resetsContainer } = await import("@/ui/resets");

    isApplied = true;
    setMaxResets(RESETS.MAX.MASTER);
    $resetsContainer.setAttribute("data-active", "");
    await setWordsByDifficulty(DIFFICULTY.MASTER);
  },
  async unapply() {
    if (!isApplied) return;

    const { $resetsContainer } = await import("@/ui/resets");

    isApplied = false;
    $resetsContainer.removeAttribute("data-active");
  },
  isApplied: () => isApplied,
});
