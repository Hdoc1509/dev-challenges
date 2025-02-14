import { setMaxResets } from "@/state/resets";
import {
  $maxResets,
  $resetsContainer,
  captureResetsIndicators,
  generateResetsIndicators,
  setResetsIndicators,
} from "@/ui/resets";
import { RESETS } from "@/consts";

export function applyMasterDifficulty() {
  setMaxResets(RESETS.MAX.MASTER);
  generateResetsIndicators(RESETS.MAX.MASTER);
  setResetsIndicators(captureResetsIndicators());
  $resetsContainer.setAttribute("data-active", "");
  $maxResets.textContent = `${RESETS.MAX.MASTER}`;
}
