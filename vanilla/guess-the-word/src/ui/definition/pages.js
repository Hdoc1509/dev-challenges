import { Pages } from "@/pages";
import { getElementById } from "@lib/dom";
import { DefinitionElement, DefinitionItem } from "@/state/definition";
import { createDefinition } from "./create-definition";
import { $menuTabContent } from "../menu";
import { DEFINITIONS_PER_PAGE } from "@/consts/definitions";

export const $definitionPagesContainer = getElementById(
  "definition-pages-container",
  HTMLDivElement,
);

// TODO: remove unnecessary features from Pages class

/** @type {Pages<string>} */
export const DefinitionPages = new Pages($definitionPagesContainer, {
  itemsPerPage: DEFINITIONS_PER_PAGE,
  // TODO: add a way to track `new` items
  // an item can be removed but also be `new` beacuse menu has not been opened
  // - update tracking when rendering and when removing
  renderItem: (item, { /* index, totalItems, */ isNew }) =>
    createDefinition(item, { isNew }),
  clearEmpty: ($page) => $page.querySelector(".not-yet")?.remove(),
  onItemRemoved: (item) => {
    const $definition = DefinitionElement.get(item);
    if ($definition == null) return;

    DefinitionItem.get($definition)?.controller.abort();
    DefinitionElement.delete(item);
  },
  onPageChange: () => $menuTabContent.scrollTo(0, 0),
  $pageTemplate: getElementById(
    "definition-page-template",
    HTMLTemplateElement,
  ),
  $pageEmptyTemplate: getElementById(
    "definition-page-empty-template",
    HTMLTemplateElement,
  ),
});
