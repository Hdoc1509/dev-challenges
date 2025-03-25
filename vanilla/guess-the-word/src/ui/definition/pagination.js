import { getElementById } from "@lib/dom";
import { Pagination } from "@/pagination";
import { DefinitionPages } from "./pages";

const $pagination = getElementById("definition-pagination", HTMLMenuElement);

export const DefinitionPagination = new Pagination($pagination, {
  pagesHandler: DefinitionPages,
  renderCurrent: false,
});
