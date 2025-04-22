import { setWordsByDifficulty } from "@/state/words";
import { setMaxResets } from "@/state/resets";
import { $resetsContainer } from "@/ui/resets";
import { RESETS } from "@/consts/resets";
import { DIFFICULTY } from "@/consts/difficulty";

export const MasterDifficulty = Object.freeze({
  apply() {
    setMaxResets(RESETS.MAX.MASTER);
    setWordsByDifficulty(DIFFICULTY.MASTER);
    $resetsContainer.setAttribute("data-active", "");
  },
  unapply: () => $resetsContainer.removeAttribute("data-active"),
});
