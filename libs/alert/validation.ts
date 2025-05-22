import { CLASSES, CSS_VARIABLES } from "./consts";

export function validateDuration($timeBar: HTMLDivElement) {
  const duration = getComputedStyle($timeBar).getPropertyValue(
    CSS_VARIABLES.TIME_BAR_DURATION,
  );

  if (duration === "")
    throw new Error(
      `Missing "${CSS_VARIABLES.TIME_BAR_DURATION}" CSS variable for ".${CLASSES.TIMER_BAR}" element`,
    );

  const time = duration.match(/^\d+/);

  if (time == null)
    throw new Error(
      `Invalid "${CSS_VARIABLES.TIME_BAR_DURATION}" CSS variable for ".${CLASSES.TIMER_BAR}" element`,
    );

  return Number(time[0]);
}
