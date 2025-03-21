import { getElementBySelector } from "@lib/dom";
import { TOTAL_WORDS } from "@/consts/definitions";

const $definitionsTotal = getElementBySelector(
  ".definitions-count__total",
  HTMLSpanElement,
);
$definitionsTotal.textContent = TOTAL_WORDS.toString();

const $definitionsProgress = getElementBySelector(
  ".definitions-count__progress",
  HTMLDivElement,
);
const $definitionsCurrent = getElementBySelector(
  ".definitions-count__current",
  HTMLSpanElement,
);

/** @param {number} count */
export const renderDefinitionsCount = (count) => {
  const percent = ((count / TOTAL_WORDS) * 100).toFixed(8);

  $definitionsProgress.style.setProperty("--definitions-count", `${percent}%`);
  $definitionsCurrent.textContent = count.toString();
};
