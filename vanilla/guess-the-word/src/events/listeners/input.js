import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { handleLetterInput } from "../handlers/letter-input";
import { isValidLetterField } from "@/ui/typing/validation";

export function setupInputListeners() {
  document.addEventListener("input", (e) => {
    const $target = e.target;

    if (isValidLetterField($target)) {
      if (InsaneDifficulty.isApplied())
        import("@/ui/timer").then(({ timerController }) =>
          handleLetterInput($target, { timerController }),
        );
      else handleLetterInput($target);
    }
  });
}
