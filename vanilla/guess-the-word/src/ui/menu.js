import { Tabs } from "@/tabs";
import { getElementById } from "@lib/dom";

export const $menuOpen = getElementById("menu-open", HTMLButtonElement);

export const $menuClose = getElementById("menu-close", HTMLButtonElement);

export const $menu = getElementById("app-menu", HTMLDialogElement);

const $menuNav = getElementById("menu-nav", HTMLElement);

const $menuContent = getElementById("menu-content", HTMLElement);

export const MenuTabs = new Tabs({ $nav: $menuNav, $content: $menuContent });
