import { setMaxResets } from "@/state/resets";
import { $resetsContainer, generateResetsIndicators } from "@/ui/info";
import { RESETS } from "@/consts";

export function applyMasterDifficulty() {
  setMaxResets(RESETS.MAX.MASTER);
  $resetsContainer.setAttribute("data-active", "");
  generateResetsIndicators(2);
}
