import { getElementBySelector } from "@lib/dom";

export const $difficultyCompleted = getElementBySelector(
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
 * @param {{ secondaryMessage?: boolean }} [options] */
export const showCompletedDifficultyMessage = (
  difficulty,
  { secondaryMessage = true } = {},
) => {
  $completedName.textContent = `${difficulty}`;
  $completedName.dataset.difficulty = difficulty;
  if (!secondaryMessage) $secondaryMessage.classList.add("hidden");
};
