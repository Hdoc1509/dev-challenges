import { Tabs } from "@/tabs";
import { getElementById, getElementBySelector } from "@lib/dom";

export const $hints = getElementBySelector(".info .hints", HTMLElement);

export const $hintsTrigger = getElementBySelector(
  ":scope > .button",
  HTMLButtonElement,
  $hints,
);
export const $hintsTriggerLabel = getElementBySelector(
  ":scope > .button__label",
  HTMLElement,
  $hintsTrigger,
);

export const $hintsContent = getElementBySelector(
  ".hints__content",
  HTMLElement,
  $hints,
);

const $hintsTabNav = getElementById("hints-tab-nav", HTMLDivElement);
export const $hintsTabContent = getElementById(
  "hints-tab-content",
  HTMLDivElement,
);

export const HintsTabs = new Tabs({
  $nav: $hintsTabNav,
  $content: $hintsTabContent,
});

export const $allHintsList = getElementBySelector(
  ":scope > #all-hints-tab-content > .hints-list",
  HTMLUListElement,
  $hintsTabContent,
);
export const $correctHintsList = getElementBySelector(
  ":scope > #correct-hints-tab-content > .hints-list",
  HTMLUListElement,
  $hintsTabContent,
);
