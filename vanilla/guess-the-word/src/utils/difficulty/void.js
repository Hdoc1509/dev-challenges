import { RESETS } from "@/consts/resets";
import { setMaxResets } from "@/state/resets";

export const VoidDifficulty = Object.freeze({
  apply() {
    setMaxResets(RESETS.MAX.VOID);
  },
});
