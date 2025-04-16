import { StepIndicatorBase } from "./base";
import { Messenger } from "./messenger";
import { validateContainer } from "./validate";
import { MESSAGE } from "./messages";
import { CLASSES, STEP } from "./consts";
import type { ExpectedElements, SharedExtraParams } from "./types";

export class StepIndicator extends StepIndicatorBase {
  constructor(
    container: ExpectedElements["$container"],
    { name, onStep }: SharedExtraParams = {},
  ) {
    const messenger = new Messenger(name);

    validateContainer(container, messenger);

    const $steps: ExpectedElements["$steps"] = container.querySelectorAll(
      `:scope > span.${CLASSES.STEP}`,
    );

    if ($steps.length < STEP.MIN) messenger.error(MESSAGE.STEP.MIN);

    super(container, { $steps, messenger, onStep });
  }
}
