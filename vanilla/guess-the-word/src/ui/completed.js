import { getElementBySelector } from "@lib/dom";

const $difficultyCompleted = getElementBySelector(
  ".info .difficulty-completed",
  HTMLElement,
);

const $primaryMessage = getElementBySelector(
  ":scope > [data-primary]",
  HTMLParagraphElement,
  $difficultyCompleted,
);

const $secondaryMessage = getElementBySelector(
  ":scope > [data-secondary]",
  HTMLParagraphElement,
  $difficultyCompleted,
);

const $completedName = getElementBySelector(
  ":scope > .difficulty-completed__name",
  HTMLSpanElement,
  $primaryMessage,
);

export const $showDifficulties = getElementBySelector(
  ":scope > .menu-trigger",
  HTMLButtonElement,
  $difficultyCompleted,
);

/** @param {import("@/consts/difficulty").Difficulty} difficulty
 * @param {{ allCompleted?: boolean }} [options] */
export const showCompletedDifficultyMessage = (
  difficulty,
  { allCompleted = false } = {},
) => {
  $difficultyCompleted.setAttribute("data-active", "");

  if (allCompleted) {
    $primaryMessage.textContent = "You have completed all the difficulties!";
    $secondaryMessage.classList.add("hidden");
    $showDifficulties.remove();
    return;
  }

  $completedName.textContent = `${difficulty}`;
  $completedName.dataset.difficulty = difficulty;
};

export const hideCompletedDifficultyMessage = () => {
  $difficultyCompleted.removeAttribute("data-active");
};
