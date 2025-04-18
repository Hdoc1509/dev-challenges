import { Pages } from "@/pages";
import { getElementById } from "@lib/dom";
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
  renderItem: ({
    item,
    /* index, totalItems, */ isNew /* , insertionMode */,
  }) => createDefinition(item, { isNew }),
  clearEmpty: ($page) => $page.querySelector(".not-yet")?.remove(),
  // onItemMoved: ($page) =>
  //   $page.insertBefore(document.createElement("hr"), $page.children[1]),
  // TODO: remove `item` from DefinitionElement Map
  onItemRemoved: (item) => console.log("onItemRemoved", item),
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
