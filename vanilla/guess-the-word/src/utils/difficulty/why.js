import { setMaxResets } from "@/state/resets";
import { RESETS } from "@/consts";

export const WhyDifficulty = Object.freeze({
  apply() {
    setMaxResets(RESETS.MAX.WHY);
  },
});
