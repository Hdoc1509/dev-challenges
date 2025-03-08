import { getElementBySelector } from "@lib/dom";

const ATTRIBUTE = {
  MENU: "data-menu=hints",
  CLOSE: "data-menu-close",
  OPEN: "data-menu-open",
};

export const $hints = getElementBySelector(".info .hints", HTMLElement);

export const $hintsDialog = getElementBySelector(
  `.menu[${ATTRIBUTE.MENU}]`,
  HTMLDialogElement,
);

export const $openHints = getElementBySelector(
  `.menu-trigger[${ATTRIBUTE.MENU}][${ATTRIBUTE.OPEN}]`,
  HTMLButtonElement,
);

export const $closeHints = getElementBySelector(
  `.menu-trigger[${ATTRIBUTE.MENU}][${ATTRIBUTE.CLOSE}]`,
  HTMLButtonElement,
);

// TODO:
// - click on $openHints:
//   - allows display of $hintsContent
//   - change $openHints text to "Hide hints"
// - $hintsContent should render a table-like structure:
//   - each row should have cells as the word length
//   - use same render logic as .typing section
//   - it will have 2 tabs:
//     - all guesses, wrong and correct. will have a row per (resets - 1)
//     - correct guesses along unknown letters, single row
// - for each letter input, the letter will be added to the respective row:
//   - remove $notYet element if present
//   - if correct, add green text and border
//   -  else, add red text and border
// - on game success/over: clean $hintsContent
