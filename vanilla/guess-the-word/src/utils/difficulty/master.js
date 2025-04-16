import { setMaxResets } from "@/state/resets";
import { $resetsContainer } from "@/ui/resets";
import { RESETS } from "@/consts/resets";

export const MasterDifficulty = Object.freeze({
  apply() {
    setMaxResets(RESETS.MAX.MASTER);
    $resetsContainer.setAttribute("data-active", "");
  },
  unapply: () => $resetsContainer.removeAttribute("data-active"),
});
