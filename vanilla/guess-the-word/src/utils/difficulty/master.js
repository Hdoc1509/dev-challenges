import { setMaxResets } from "@/state/resets";
import {
  $resetsContainer,
  captureResetsIndicators,
  generateResetsIndicators,
  setResetsIndicators,
} from "@/ui/resets";
import { RESETS } from "@/consts";

export function applyMasterDifficulty() {
  setMaxResets(RESETS.MAX.MASTER);
  $resetsContainer.setAttribute("data-active", "");
  generateResetsIndicators(2);
  setResetsIndicators(captureResetsIndicators());
}
