import { $resetsContainer, generateResetsIndicators } from "@/ui/info";

export function applyMasterDifficulty() {
  // TODO: set maxResets to 2;
  $resetsContainer.setAttribute("data-active", "");
  generateResetsIndicators(2);
}
