import { getElementById } from "@lib/dom";
import { Tabs } from "@/tabs";

export const $menuOpen = getElementById("menu-open", HTMLButtonElement);

export const $menuClose = getElementById("menu-close", HTMLButtonElement);

export const $menu = getElementById("app-menu", HTMLDialogElement);

const $menuTabNav = getElementById("menu-tab-nav", HTMLElement);
export const $definitionsTab = getElementById(
  "definitions-tab",
  HTMLButtonElement,
);
export const $statsTab = getElementById("stats-tab", HTMLButtonElement);
export const $statsTabContent = getElementById(
  "stats-tab-content",
  HTMLElement,
);

export const $menuTabContent = getElementById("menu-content", HTMLElement);

export const MenuTabs = new Tabs({
  $nav: $menuTabNav,
  $content: $menuTabContent,
});
