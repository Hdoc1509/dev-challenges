import { setWordsByDifficulty } from "@/state/words";
import { setMaxResets } from "@/state/resets";
import { $resetsContainer } from "@/ui/resets";
import { RESETS } from "@/consts/resets";
import { DIFFICULTY } from "@/consts/difficulty";

export const MasterDifficulty = Object.freeze({
  async apply() {
    setMaxResets(RESETS.MAX.MASTER);
    $resetsContainer.setAttribute("data-active", "");
    await setWordsByDifficulty(DIFFICULTY.MASTER);
  },
  unapply: () => $resetsContainer.removeAttribute("data-active"),
});
