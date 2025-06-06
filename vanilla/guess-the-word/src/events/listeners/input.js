import { handleLetterInput } from "../handlers/letter-input";
import { isValidLetterField } from "@/ui/typing/validation";

export function setupInputListeners() {
  document.addEventListener("input", (e) => {
    const $target = e.target;

    if (isValidLetterField($target)) handleLetterInput($target);
  });
}
