import { MESSAGE } from "./messages";
import { CLASSES } from "./consts";
import type { Messenger } from "./messenger";
import type { ExpectedElements } from "./types";

export function validateContainer(
  $container: ExpectedElements["$container"],
  messenger: Messenger,
) {
  if ($container == null) messenger.error(MESSAGE.CONTAINER.MISSING);
  if (!($container instanceof HTMLDivElement))
    messenger.error(MESSAGE.CONTAINER.INVALID_HTML_ELEMENT);
  if (!$container.classList.contains(CLASSES.INDICATOR))
    messenger.error(MESSAGE.CONTAINER.INDICATOR_CLASS);
}
